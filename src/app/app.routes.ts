import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    title: 'Início | Instituto Raízes da Comunidade'
  },
  {
    path: 'quem-somos',
    loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent),
    title: 'Quem Somos | Instituto Raízes da Comunidade'
  },
  {
    path: 'projetos',
    loadComponent: () => import('./pages/projects/projects').then(m => m.ProjectsComponent),
    title: 'Projetos e Ações | Instituto Raízes da Comunidade'
  },
  {
    path: 'transparencia',
    loadComponent: () => import('./pages/transparency/transparency').then(m => m.TransparencyComponent),
    title: 'Portal da Transparência MROSC | Instituto Raízes da Comunidade'
  },
  {
    path: 'noticias',
    loadComponent: () => import('./pages/news/news').then(m => m.NewsComponent),
    title: 'Notícias & Comunicados | Instituto Raízes da Comunidade'
  },
  {
    path: 'voluntariado',
    loadComponent: () => import('./pages/volunteering/volunteering').then(m => m.VolunteeringComponent),
    title: 'Programa de Voluntariado | Instituto Raízes da Comunidade'
  },
  {
    path: 'doacoes',
    loadComponent: () => import('./pages/donations/donations').then(m => m.DonationsComponent),
    title: 'Apoie via PIX e Parcerias | Instituto Raízes da Comunidade'
  },
  {
    path: 'contato',
    loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent),
    title: 'Contato & Localização | Instituto Raízes da Comunidade'
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then(m => m.AdminComponent),
    title: 'Painel Administrativo & Transparência | Instituto Raízes da Comunidade'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

