import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BrandLogo } from '../brand-logo/brand-logo';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, BrandLogo],
  template: `
    <footer class="bg-white border-t border-slate-200 text-slate-600 text-sm">
      
      <!-- Top Institutional Trust Bar -->
      <div class="border-b border-slate-100 bg-[#fafbfc] py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <app-brand-logo [size]="48" />
            <div>
              <p class="font-bold text-slate-900 text-base leading-tight">
                ASSOCIAÇÃO COMUNITÁRIA DE PADRE LÚCIO
              </p>
              <p class="text-xs text-slate-500 font-medium">
                Nome Fantasia: INSTITUTO RAÍZES DA COMUNIDADE · Povoado de Padre Lúcio - GO
              </p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-4 text-xs font-medium">
            <a 
              [href]="dataService.institution().contact.instagramUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#079F50] hover:border-[#079F50] transition-colors shadow-2xs"
            >
              <svg class="w-4 h-4 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>{{ dataService.institution().contact.instagram }}</span>
            </a>

            <a 
              [href]="'https://wa.me/' + dataService.institution().contact.whatsapp" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#079F50] hover:border-[#079F50] transition-colors shadow-2xs"
            >
              <mat-icon class="text-emerald-600 text-base">chat</mat-icon>
              <span>WhatsApp Oficial</span>
            </a>

            <a 
              routerLink="/doacoes" 
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#079F50] text-white hover:bg-[#057d3e] font-semibold transition-all shadow-sm"
            >
              <mat-icon class="text-base">favorite</mat-icon>
              <span>Apoiar com PIX</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Main Navigation & Legal Columns -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <!-- Col 1 & 2: About and Legal -->
          <div class="lg:col-span-2 space-y-4">
            <h4 class="text-xs uppercase tracking-widest font-bold text-slate-900">Sobre a Organização</h4>
            <p class="text-xs text-slate-600 leading-relaxed max-w-sm">
              Organização da Sociedade Civil (OSC) sem fins lucrativos dedicada ao desenvolvimento comunitário, soberania alimentar através da agroecologia, educação infantojuvenil e resgate das tradições e memórias de Padre Lúcio.
            </p>
            <div class="text-xs text-slate-500 space-y-1 pt-2">
              <p><strong class="text-slate-700">CNPJ:</strong> {{ dataService.institution().cnpj }}</p>
              <p><strong class="text-slate-700">Endereço:</strong> {{ dataService.institution().headquartersAddress.street }}, {{ dataService.institution().headquartersAddress.neighborhood }} - {{ dataService.institution().headquartersAddress.city }}/{{ dataService.institution().headquartersAddress.state }}</p>
              <p><strong class="text-slate-700">E-mail:</strong> {{ dataService.institution().contact.email }}</p>
            </div>
          </div>

          <!-- Col 3: Institutional Links -->
          <div class="space-y-3">
            <h4 class="text-xs uppercase tracking-widest font-bold text-slate-900">Institucional</h4>
            <ul class="space-y-2 text-xs">
              <li><a routerLink="/quem-somos" class="hover:text-slate-900 transition-colors">História e Origem</a></li>
              <li><a routerLink="/quem-somos" class="hover:text-slate-900 transition-colors">Missão, Visão e Valores</a></li>
              <li><a routerLink="/quem-somos" class="hover:text-slate-900 transition-colors">Diretoria & Governança</a></li>
              <li><a routerLink="/quem-somos" class="hover:text-slate-900 transition-colors">Mensagem da Presidência</a></li>
              <li><a routerLink="/noticias" class="hover:text-slate-900 transition-colors">Notícias & Comunicados</a></li>
            </ul>
          </div>

          <!-- Col 4: Transparency & Compliance -->
          <div class="space-y-3">
            <h4 class="text-xs uppercase tracking-widest font-bold text-slate-900">Transparência & MROSC</h4>
            <ul class="space-y-2 text-xs">
              <li><a routerLink="/transparencia" class="hover:text-slate-900 transition-colors font-medium text-[#079F50]">Portal da Transparência</a></li>
              <li><a routerLink="/transparencia" class="hover:text-slate-900 transition-colors">Estatuto Social & Atas</a></li>
              <li><a routerLink="/transparencia" class="hover:text-slate-900 transition-colors">Convênios & Termos MROSC</a></li>
              <li><a routerLink="/transparencia" class="hover:text-slate-900 transition-colors">Demonstrativos Financeiros</a></li>
              <li><a routerLink="/transparencia" class="hover:text-slate-900 transition-colors">Relatórios de Atividades</a></li>
              <li><a routerLink="/transparencia" class="hover:text-slate-900 transition-colors">Certidões de Regularidade</a></li>
            </ul>
          </div>

          <!-- Col 5: Engagement & Admin -->
          <div class="space-y-3">
            <h4 class="text-xs uppercase tracking-widest font-bold text-slate-900">Participação Social</h4>
            <ul class="space-y-2 text-xs">
              <li><a routerLink="/voluntariado" class="hover:text-slate-900 transition-colors">Programa de Voluntariado</a></li>
              <li><a routerLink="/doacoes" class="hover:text-slate-900 transition-colors">Doação via PIX</a></li>
              <li><a routerLink="/doacoes" class="hover:text-slate-900 transition-colors">Parcerias Empresariais ESG</a></li>
              <li><a routerLink="/contato" class="hover:text-slate-900 transition-colors">Fale Conosco</a></li>
              <li class="pt-2">
                <a routerLink="/admin" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors">
                  <mat-icon class="text-xs !text-[14px] text-[#32A5E8]">admin_panel_settings</mat-icon>
                  <span>Painel Administrativo</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Legal Regulatory Framework Disclaimer -->
        <div class="mt-12 pt-6 border-t border-slate-100 bg-slate-50/70 p-5 rounded-2xl text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p class="font-semibold text-slate-700">
            Marco Regulatório e Conformidade Legal:
          </p>
          <p>
            Esta plataforma atende aos preceitos da <strong>Lei Federal nº 13.019/2014</strong> (Marco Regulatório das Organizações da Sociedade Civil - MROSC), do <strong>Decreto Federal nº 8.726/2016</strong>, da <strong>Lei de Acesso à Informação (Lei 12.527/2011)</strong> e da <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei 13.709/2018)</strong>.
          </p>
          <p class="text-[10px] text-slate-400">
            Aviso Institucional: O sistema apoia a organização documental, a integridade de dados e a transparência pública, sem declarar automaticamente conformidade ou regularidade jurídica, atribuição de competência exclusiva dos órgãos concedentes, tribunais de contas e assessorias jurídicas competentes. Dados numéricos e cadastrais indicados são demonstrativos e editáveis pelos gestores.
          </p>
        </div>

        <!-- Copyright -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Associação Comunitária de Padre Lúcio - Instituto Raízes da Comunidade. Todos os direitos reservados.</p>
          <div class="flex items-center gap-4">
            <a routerLink="/transparencia" class="hover:text-slate-600 transition-colors">Transparência Ativa</a>
            <span>·</span>
            <a routerLink="/contato" class="hover:text-slate-600 transition-colors">Privacidade e LGPD</a>
            <span>·</span>
            <a routerLink="/admin" class="hover:text-slate-600 transition-colors">Ambiente Restrito</a>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly dataService = inject(DataService);
}
