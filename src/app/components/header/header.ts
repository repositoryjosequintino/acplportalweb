import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BrandLogo } from '../brand-logo/brand-logo';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatIconModule, BrandLogo],
  template: `
    <!-- Top Utility Transparency Banner (Apple-style subtle notice) -->
    <aside class="bg-slate-900 text-slate-300 text-[11px] md:text-xs py-1.5 px-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 truncate">
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-[#079F50]"></span>
          <span class="font-medium text-slate-200">Portal Oficial da Transparência Ativa:</span>
          <span class="text-slate-400 hidden sm:inline">Em conformidade com a Lei nº 13.019/2014 (MROSC) e LGPD</span>
        </div>
        <div class="flex items-center gap-4 shrink-0 text-slate-400">
          <a 
            [href]="dataService.institution().contact.instagramUrl" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-white flex items-center gap-1 transition-colors"
            title="Siga no Instagram"
          >
            <span class="hidden sm:inline">Instagram</span>
            <span>{{ dataService.institution().contact.instagram }}</span>
          </a>
          <span class="text-slate-600 hidden md:inline">|</span>
          <a 
            routerLink="/admin" 
            class="text-[#32A5E8] hover:text-white flex items-center gap-1 font-medium transition-colors"
            title="Acesso Restrito da Gestão e Diretoria"
          >
            <mat-icon class="text-xs !text-[14px]">lock</mat-icon>
            <span>Área da Gestão</span>
          </a>
        </div>
      </div>
    </aside>

    <!-- Main Navigation Bar -->
    <header class="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 border-b border-slate-200/80 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        <!-- Zone 1: Brand Wordmark -->
        <a routerLink="/" class="group flex items-center gap-3 shrink-0 py-2">
          <app-brand-logo [size]="42" />
        </a>

        <!-- Zone 2: Navigation Links (Apple Clean Typography & Pill Active States) -->
        <nav class="hidden lg:flex items-center gap-1.5 text-[13px] font-medium tracking-tight text-slate-600">
          <a 
            routerLink="/" 
            routerLinkActive="!text-[#079F50] !bg-emerald-50/80 font-semibold shadow-xs" 
            [routerLinkActiveOptions]="{ exact: true }"
            class="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all duration-200 whitespace-nowrap"
          >
            Início
          </a>
          <a 
            routerLink="/quem-somos" 
            routerLinkActive="!text-[#079F50] !bg-emerald-50/80 font-semibold shadow-xs" 
            class="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all duration-200 whitespace-nowrap"
          >
            Quem Somos
          </a>
          <a 
            routerLink="/projetos" 
            routerLinkActive="!text-[#079F50] !bg-emerald-50/80 font-semibold shadow-xs" 
            class="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all duration-200 whitespace-nowrap"
          >
            Projetos & Ações
          </a>
          <a 
            routerLink="/transparencia" 
            routerLinkActive="!text-[#079F50] !bg-emerald-50/80 font-semibold shadow-xs" 
            class="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all duration-200 whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Transparência</span>
            <span class="w-1.5 h-1.5 rounded-full bg-[#079F50] animate-pulse"></span>
          </a>
          <a 
            routerLink="/noticias" 
            routerLinkActive="!text-[#079F50] !bg-emerald-50/80 font-semibold shadow-xs" 
            class="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all duration-200 whitespace-nowrap"
          >
            Notícias
          </a>
          <a 
            routerLink="/voluntariado" 
            routerLinkActive="!text-[#079F50] !bg-emerald-50/80 font-semibold shadow-xs" 
            class="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all duration-200 whitespace-nowrap"
          >
            Voluntariado
          </a>
          <a 
            routerLink="/contato" 
            routerLinkActive="!text-[#079F50] !bg-emerald-50/80 font-semibold shadow-xs" 
            class="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-all duration-200 whitespace-nowrap"
          >
            Contato
          </a>
        </nav>

        <!-- Zone 3: Primary Actions -->
        <div class="hidden sm:flex items-center gap-3 shrink-0">
          <a 
            routerLink="/transparencia" 
            class="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all"
          >
            <mat-icon class="text-base text-slate-500">search</mat-icon>
            <span>Consultar Documentos</span>
          </a>

          <a 
            routerLink="/doacoes" 
            class="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#079F50] hover:bg-[#057d3e] rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
          >
            <mat-icon class="text-base">favorite</mat-icon>
            <span>Apoiar / PIX</span>
          </a>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button 
          (click)="toggleMobileMenu()" 
          class="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          [attr.aria-label]="mobileMenuOpen() ? 'Fechar menu' : 'Abrir menu'"
        >
          <mat-icon>{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
        </button>
      </div>

      <!-- Mobile Dropdown Navigation -->
      @if (mobileMenuOpen()) {
        <div class="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-5 py-6 space-y-3 shadow-2xl animate-fade-in">
          <nav class="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <a 
              routerLink="/" 
              (click)="closeMobileMenu()" 
              routerLinkActive="text-[#079F50] font-semibold bg-emerald-50" 
              [routerLinkActiveOptions]="{ exact: true }"
              class="px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Início</span>
              <mat-icon class="text-slate-400 text-sm">chevron_right</mat-icon>
            </a>
            <a 
              routerLink="/quem-somos" 
              (click)="closeMobileMenu()" 
              routerLinkActive="text-[#079F50] font-semibold bg-emerald-50" 
              class="px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Quem Somos</span>
              <mat-icon class="text-slate-400 text-sm">chevron_right</mat-icon>
            </a>
            <a 
              routerLink="/projetos" 
              (click)="closeMobileMenu()" 
              routerLinkActive="text-[#079F50] font-semibold bg-emerald-50" 
              class="px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Projetos & Ações</span>
              <mat-icon class="text-slate-400 text-sm">chevron_right</mat-icon>
            </a>
            <a 
              routerLink="/transparencia" 
              (click)="closeMobileMenu()" 
              routerLinkActive="text-[#079F50] font-semibold bg-emerald-50" 
              class="px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <span>Portal da Transparência</span>
                <span class="text-[10px] bg-[#079F50] text-white font-bold px-1.5 py-0.5 rounded">MROSC</span>
              </div>
              <mat-icon class="text-slate-400 text-sm">chevron_right</mat-icon>
            </a>
            <a 
              routerLink="/noticias" 
              (click)="closeMobileMenu()" 
              routerLinkActive="text-[#079F50] font-semibold bg-emerald-50" 
              class="px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Notícias & Comunicados</span>
              <mat-icon class="text-slate-400 text-sm">chevron_right</mat-icon>
            </a>
            <a 
              routerLink="/voluntariado" 
              (click)="closeMobileMenu()" 
              routerLinkActive="text-[#079F50] font-semibold bg-emerald-50" 
              class="px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Voluntariado</span>
              <mat-icon class="text-slate-400 text-sm">chevron_right</mat-icon>
            </a>
            <a 
              routerLink="/doacoes" 
              (click)="closeMobileMenu()" 
              routerLinkActive="text-[#079F50] font-semibold bg-emerald-50" 
              class="px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Doações & Parcerias</span>
              <mat-icon class="text-slate-400 text-sm">chevron_right</mat-icon>
            </a>
            <a 
              routerLink="/contato" 
              (click)="closeMobileMenu()" 
              routerLinkActive="text-[#079F50] font-semibold bg-emerald-50" 
              class="px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Contato & Localização</span>
              <mat-icon class="text-slate-400 text-sm">chevron_right</mat-icon>
            </a>
            <a 
              routerLink="/admin" 
              (click)="closeMobileMenu()" 
              class="px-3 py-2.5 rounded-lg bg-slate-900 text-white font-medium flex items-center justify-between mt-2"
            >
              <div class="flex items-center gap-2">
                <mat-icon class="text-sm text-[#32A5E8]">admin_panel_settings</mat-icon>
                <span>Painel Administrativo / Gestão</span>
              </div>
              <mat-icon class="text-slate-400 text-sm">arrow_forward</mat-icon>
            </a>
          </nav>
        </div>
      }
    </header>
  `
})
export class Header {
  readonly dataService = inject(DataService);
  readonly mobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
