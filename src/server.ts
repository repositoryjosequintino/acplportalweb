import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Body parser
app.use(express.json());

// In-Memory Database Store (Prepared for PostgreSQL / Firebase or Cloud SQL integration)
const inMemoryStore = {
  institution: {
    legalName: 'ASSOCIAÇÃO COMUNITÁRIA DE PADRE LÚCIO',
    tradeName: 'INSTITUTO RAÍZES DA COMUNIDADE',
    cnpj: '00.000.000/0001-00 (Demonstrativo)',
    location: 'Padre Lúcio - GO',
    instagram: '@instituto229'
  },
  stats: {
    beneficiaries: 480,
    students: 290,
    seedlingsPlanted: 1250,
    workshopsCount: 164
  },
  volunteers: [] as Record<string, unknown>[]
};

/**
 * REST API ENDPOINTS
 */

// Healthcheck & System Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    entity: inMemoryStore.institution.tradeName,
    legalName: inMemoryStore.institution.legalName,
    framework: 'MROSC Lei 13.019/2014 & LGPD',
    timestamp: new Date().toISOString()
  });
});

// Institutional Stats
app.get('/api/stats', (req, res) => {
  res.json(inMemoryStore.stats);
});

// Volunteers API
app.get('/api/volunteers', (req, res) => {
  res.json(inMemoryStore.volunteers);
});

app.post('/api/volunteers', (req, res) => {
  const data = req.body;
  const newVol = {
    id: `vol-${Date.now()}`,
    ...data,
    status: 'Novo',
    createdAt: new Date().toISOString()
  };
  inMemoryStore.volunteers.push(newVol);
  res.status(201).json({
    success: true,
    protocol: `VOL-${Date.now().toString().slice(-6)}`,
    volunteer: newVol
  });
});

// Contact Form API
app.post('/api/contact', (req, res) => {
  const contactData = req.body;
  console.log(`[Contato Recebido]: ${contactData?.email || 'anônimo'}`);
  res.status(200).json({
    success: true,
    message: 'Mensagem recebida com sucesso pela Associação Comunitária de Padre Lúcio.',
    receiptId: `MSG-${Date.now().toString().slice(-6)}`
  });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
