import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { ProjectCategory } from '../../models/project.model';
import { NewsCategory, UserRole } from '../../models/additional.model';
import { InstrumentType } from '../../models/transparency.model';

type AdminSection = 'dashboard' | 'projetos' | 'noticias' | 'transparencia' | 'voluntarios' | 'configuracoes' | 'auditoria';

@Component({
  selector: 'app-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      
      <!-- Top Admin Header -->
      <header class="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-40">
        <div class="flex items-center gap-3">
          <a routerLink="/" class="text-slate-400 hover:text-white transition-colors" title="Retornar ao Portal Público">
            <mat-icon class="text-lg">arrow_back</mat-icon>
          </a>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-2.5">
            <img 
              src="/favicon.png" 
              alt="Logo Instituto Raízes" 
              class="w-7 h-7 rounded-lg object-contain shadow-xs" 
            />
            <div>
              <h1 class="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
                Painel Administrativo & Transparência
              </h1>
              <span class="text-[10px] text-slate-400 hidden sm:inline">Instituto Raízes da Comunidade · MROSC</span>
            </div>
          </div>
        </div>

        <!-- Role Selector & Current User -->
        <div class="flex items-center gap-3 text-xs">
          <div class="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            <span class="text-[11px] text-slate-400">Perfil Ativo:</span>
            <select 
              [value]="dataService.currentUser().role"
              (change)="onRoleChange($event)"
              class="bg-transparent text-emerald-400 font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="Super Admin" class="bg-slate-900 text-white">Super Admin (Diretoria)</option>
              <option value="Gestor de Transparência" class="bg-slate-900 text-white">Gestor de Transparência (MROSC)</option>
              <option value="Editor de Conteúdo" class="bg-slate-900 text-white">Editor de Conteúdo (Comunicação)</option>
            </select>
          </div>

          <a 
            routerLink="/" 
            class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <mat-icon class="text-xs !text-[14px]">public</mat-icon>
            <span class="hidden sm:inline">Ver Portal Público</span>
          </a>
        </div>
      </header>

      <!-- Main Layout: Sidebar + Workspace -->
      <div class="flex-1 flex flex-col md:flex-row">
        
        <!-- Sidebar Navigation -->
        <aside class="w-full md:w-64 bg-slate-950/80 border-r border-slate-800 p-4 space-y-2 shrink-0">
          <div class="text-[10px] uppercase tracking-widest font-bold text-slate-500 px-3 py-1">
            Módulos de Gestão
          </div>

          <nav class="space-y-1 text-xs font-medium">
            <button 
              (click)="activeSection.set('dashboard')"
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
              [class.bg-[#079F50]]="activeSection() === 'dashboard'"
              [class.text-white]="activeSection() === 'dashboard'"
              [class.text-slate-400]="activeSection() !== 'dashboard'"
              [class.hover:bg-slate-800]="activeSection() !== 'dashboard'"
              [class.hover:text-slate-200]="activeSection() !== 'dashboard'"
            >
              <div class="flex items-center gap-2.5">
                <mat-icon class="text-base">dashboard</mat-icon>
                <span>Dashboard & Alertas</span>
              </div>
              @if (dataService.alerts().length > 0) {
                <span class="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {{ dataService.alerts().length }}
                </span>
              }
            </button>

            <button 
              (click)="activeSection.set('projetos')"
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
              [class.bg-[#079F50]]="activeSection() === 'projetos'"
              [class.text-white]="activeSection() === 'projetos'"
              [class.text-slate-400]="activeSection() !== 'projetos'"
              [class.hover:bg-slate-800]="activeSection() !== 'projetos'"
            >
              <div class="flex items-center gap-2.5">
                <mat-icon class="text-base">assignment</mat-icon>
                <span>Projetos & Ações</span>
              </div>
              <span class="text-[11px] font-mono text-slate-500">{{ dataService.projects().length }}</span>
            </button>

            <button 
              (click)="activeSection.set('transparencia')"
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
              [class.bg-[#079F50]]="activeSection() === 'transparencia'"
              [class.text-white]="activeSection() === 'transparencia'"
              [class.text-slate-400]="activeSection() !== 'transparencia'"
              [class.hover:bg-slate-800]="activeSection() !== 'transparencia'"
            >
              <div class="flex items-center gap-2.5">
                <mat-icon class="text-base">account_balance</mat-icon>
                <span>Transparência & MROSC</span>
              </div>
              <span class="text-[11px] font-mono text-slate-500">{{ dataService.instruments().length }}</span>
            </button>

            <button 
              (click)="activeSection.set('noticias')"
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
              [class.bg-[#079F50]]="activeSection() === 'noticias'"
              [class.text-white]="activeSection() === 'noticias'"
              [class.text-slate-400]="activeSection() !== 'noticias'"
              [class.hover:bg-slate-800]="activeSection() !== 'noticias'"
            >
              <div class="flex items-center gap-2.5">
                <mat-icon class="text-base">newspaper</mat-icon>
                <span>Notícias & Comunicados</span>
              </div>
              <span class="text-[11px] font-mono text-slate-500">{{ dataService.news().length }}</span>
            </button>

            <button 
              (click)="activeSection.set('voluntarios')"
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
              [class.bg-[#079F50]]="activeSection() === 'voluntarios'"
              [class.text-white]="activeSection() === 'voluntarios'"
              [class.text-slate-400]="activeSection() !== 'voluntarios'"
              [class.hover:bg-slate-800]="activeSection() !== 'voluntarios'"
            >
              <div class="flex items-center gap-2.5">
                <mat-icon class="text-base">volunteer_activism</mat-icon>
                <span>Voluntariado</span>
              </div>
              <span class="text-[11px] font-mono text-slate-500">{{ dataService.volunteers().length }}</span>
            </button>

            <button 
              (click)="activeSection.set('configuracoes')"
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
              [class.bg-[#079F50]]="activeSection() === 'configuracoes'"
              [class.text-white]="activeSection() === 'configuracoes'"
              [class.text-slate-400]="activeSection() !== 'configuracoes'"
              [class.hover:bg-slate-800]="activeSection() !== 'configuracoes'"
            >
              <div class="flex items-center gap-2.5">
                <mat-icon class="text-base">settings</mat-icon>
                <span>Indicadores & Dados</span>
              </div>
            </button>

            <button 
              (click)="activeSection.set('auditoria')"
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
              [class.bg-[#079F50]]="activeSection() === 'auditoria'"
              [class.text-white]="activeSection() === 'auditoria'"
              [class.text-slate-400]="activeSection() !== 'auditoria'"
              [class.hover:bg-slate-800]="activeSection() !== 'auditoria'"
            >
              <div class="flex items-center gap-2.5">
                <mat-icon class="text-base">history</mat-icon>
                <span>Trilha de Auditoria</span>
              </div>
              <span class="text-[11px] font-mono text-slate-500">{{ dataService.auditLogs().length }}</span>
            </button>
          </nav>

          <!-- Current user badge -->
          <div class="pt-6 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <span class="block text-slate-500 font-semibold uppercase text-[10px]">Operador Atual:</span>
            <p class="font-bold text-slate-200">{{ dataService.currentUser().name }}</p>
            <p class="text-[10px] text-emerald-400 font-mono">{{ dataService.currentUser().role }}</p>
          </div>
        </aside>

        <!-- Main Content Viewport -->
        <main class="flex-1 p-4 sm:p-8 bg-slate-900/60 overflow-y-auto">
          
          <!-- SECTION 1: DASHBOARD -->
          @if (activeSection() === 'dashboard') {
            <div class="space-y-8 max-w-6xl">
              
              <!-- Title and Quick Stats -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 class="text-2xl font-extrabold text-white">Painel Geral de Controle</h2>
                  <p class="text-xs text-slate-400">Monitoramento em tempo real de conformidade, vigência e transparência institucional.</p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    MROSC Regular
                  </span>
                </div>
              </div>

              <!-- Alerts Box (Compliance, Expiring docs, Accountability) -->
              @if (dataService.alerts().length > 0) {
                <div class="space-y-3">
                  <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <mat-icon class="text-base">warning</mat-icon>
                    <span>Alertas de Conformidade e Gestão ({{ dataService.alerts().length }})</span>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    @for (alert of dataService.alerts(); track alert.id) {
                      <div class="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
                        <div class="flex items-center justify-between text-xs">
                          <span class="font-bold text-amber-400">{{ alert.title }}</span>
                          @if (alert.dueDate) {
                            <span class="text-[10px] font-mono text-slate-400">Prazo: {{ alert.dueDate }}</span>
                          }
                        </div>
                        <p class="text-xs text-slate-300 leading-relaxed">{{ alert.message }}</p>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- KPIs Grid -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span class="text-[11px] text-slate-400 uppercase font-semibold">Projetos em Execução</span>
                  <p class="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                    {{ dataService.projects().length }}
                  </p>
                  <span class="text-[10px] text-slate-500 block">Capacidade total ativa</span>
                </div>

                <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span class="text-[11px] text-emerald-400 uppercase font-semibold">Total Recursos MROSC</span>
                  <p class="text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums">
                    R$ {{ dataService.financialKpis().publicTransferred.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
                  </p>
                  <span class="text-[10px] text-slate-500 block">100% sob controle contábil</span>
                </div>

                <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span class="text-[11px] text-[#32A5E8] uppercase font-semibold">Recursos Executados</span>
                  <p class="text-2xl sm:text-3xl font-extrabold text-[#32A5E8] tabular-nums">
                    R$ {{ dataService.financialKpis().publicExecuted.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
                  </p>
                  <span class="text-[10px] text-slate-500 block">Taxa: {{ dataService.financialKpis().executionRate.toFixed(1) }}%</span>
                </div>

                <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span class="text-[11px] text-slate-400 uppercase font-semibold">Candidatos a Voluntário</span>
                  <p class="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                    {{ dataService.volunteers().length }}
                  </p>
                  <span class="text-[10px] text-slate-500 block">Cadastros no portal</span>
                </div>
              </div>

              <!-- Quick Operations Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h3 class="text-sm font-bold text-white flex items-center gap-2">
                    <mat-icon class="text-[#079F50] text-base">flash_on</mat-icon>
                    <span>Ações Rápidas de Gestão</span>
                  </h3>
                  <div class="grid grid-cols-2 gap-3 text-xs">
                    <button 
                      (click)="activeSection.set('projetos'); showNewProjectForm.set(true)"
                      class="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-colors cursor-pointer"
                    >
                      <mat-icon class="text-emerald-400 text-sm block mb-1">add_circle</mat-icon>
                      <span class="font-bold text-slate-200 block">Novo Projeto</span>
                      <span class="text-[10px] text-slate-500">Cadastrar no catálogo</span>
                    </button>

                    <button 
                      (click)="activeSection.set('noticias'); showNewNewsForm.set(true)"
                      class="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-colors cursor-pointer"
                    >
                      <mat-icon class="text-sky-400 text-sm block mb-1">post_add</mat-icon>
                      <span class="font-bold text-slate-200 block">Publicar Notícia</span>
                      <span class="text-[10px] text-slate-500">Divulgar informativo</span>
                    </button>

                    <button 
                      (click)="activeSection.set('transparencia'); showNewInstrumentForm.set(true)"
                      class="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-colors cursor-pointer"
                    >
                      <mat-icon class="text-amber-400 text-sm block mb-1">note_add</mat-icon>
                      <span class="font-bold text-slate-200 block">Novo Convênio</span>
                      <span class="text-[10px] text-slate-500">Termo de Fomento/Colaboração</span>
                    </button>

                    <button 
                      (click)="activeSection.set('configuracoes')"
                      class="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-colors cursor-pointer"
                    >
                      <mat-icon class="text-purple-400 text-sm block mb-1">tune</mat-icon>
                      <span class="font-bold text-slate-200 block">Indicadores Sociais</span>
                      <span class="text-[10px] text-slate-500">Editar métricas de impacto</span>
                    </button>
                  </div>
                </div>

                <!-- Recent Audits Snippet -->
                <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-bold text-white flex items-center gap-2">
                      <mat-icon class="text-[#32A5E8] text-base">history</mat-icon>
                      <span>Últimas Alterações Auditadas</span>
                    </h3>
                    <button (click)="activeSection.set('auditoria')" class="text-xs text-[#079F50] hover:underline">Ver todas</button>
                  </div>

                  <div class="divide-y divide-slate-800/80 text-xs">
                    @for (log of dataService.auditLogs().slice(0, 3); track log.id) {
                      <div class="py-2.5 space-y-1">
                        <div class="flex items-center justify-between text-[11px]">
                          <span class="font-bold text-slate-300">{{ log.action }} em {{ log.entity }}</span>
                          <span class="font-mono text-slate-500 text-[10px]">{{ log.timestamp }}</span>
                        </div>
                        <p class="text-slate-400 text-[11px]">{{ log.entityTitle }} ({{ log.user }})</p>
                      </div>
                    }
                  </div>
                </div>
              </div>

            </div>
          }

          <!-- SECTION 2: PROJETOS CRUD -->
          @if (activeSection() === 'projetos') {
            <div class="space-y-6 max-w-6xl">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 class="text-xl font-bold text-white">Gestão de Projetos e Ações Comunitárias</h2>
                  <p class="text-xs text-slate-400">Cadastre e edite objetivos, fotos, público atendido e resultados de cada projeto.</p>
                </div>
                <button 
                  (click)="showNewProjectForm.set(!showNewProjectForm())"
                  class="px-4 py-2 rounded-xl bg-[#079F50] hover:bg-[#057d3e] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <mat-icon class="text-sm">{{ showNewProjectForm() ? 'close' : 'add' }}</mat-icon>
                  <span>{{ showNewProjectForm() ? 'Fechar Formulário' : 'Adicionar Novo Projeto' }}</span>
                </button>
              </div>

              <!-- New Project Form (Reactive Forms) -->
              @if (showNewProjectForm()) {
                <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 animate-fade-in">
                  <h3 class="text-sm font-bold text-white">Cadastrar Novo Projeto</h3>
                  <form [formGroup]="projectForm" (ngSubmit)="onCreateProject()" class="space-y-4 text-xs">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div class="space-y-1">
                        <label for="admProjTitle" class="font-bold text-slate-300">Título do Projeto *</label>
                        <input 
                          id="admProjTitle"
                          type="text" 
                          formControlName="title"
                          placeholder="Ex: Projeto Vozes de Padre Lúcio"
                          class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#079F50]"
                        />
                      </div>

                      <div class="space-y-1">
                        <label for="admProjCategory" class="font-bold text-slate-300">Categoria *</label>
                        <select 
                          id="admProjCategory"
                          formControlName="category"
                          class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#079F50]"
                        >
                          <option value="Educação">Educação</option>
                          <option value="Agroecologia & Meio Ambiente">Agroecologia & Meio Ambiente</option>
                          <option value="Cultura & Memória">Cultura & Memória</option>
                          <option value="Inclusão Social & Esporte">Inclusão Social & Esporte</option>
                        </select>
                      </div>

                      <div class="space-y-1">
                        <label for="admProjTarget" class="font-bold text-slate-300">Público Atendido & Estimativa *</label>
                        <input 
                          id="admProjTarget"
                          type="text" 
                          formControlName="targetPublic"
                          placeholder="Ex: 80 famílias e crianças de Padre Lúcio"
                          class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#079F50]"
                        />
                      </div>

                      <div class="space-y-1">
                        <label for="admProjPeriod" class="font-bold text-slate-300">Período de Execução *</label>
                        <input 
                          id="admProjPeriod"
                          type="text" 
                          formControlName="period"
                          placeholder="Ex: 2026 - 2027"
                          class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#079F50]"
                        />
                      </div>
                    </div>

                    <div class="space-y-1">
                      <label for="admProjDesc" class="font-bold text-slate-300">Descrição Curta *</label>
                      <textarea 
                        id="admProjDesc"
                        rows="2"
                        formControlName="shortDescription"
                        placeholder="Resumo das atividades..."
                        class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#079F50]"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      [disabled]="projectForm.invalid"
                      class="px-6 py-2.5 rounded-xl bg-[#079F50] hover:bg-[#057d3e] text-white font-semibold cursor-pointer disabled:opacity-50"
                    >
                      Salvar Projeto
                    </button>
                  </form>
                </div>
              }

              <!-- Projects Table -->
              <div class="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
                <table class="w-full text-left text-xs">
                  <thead class="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th class="py-3 px-4">Projeto</th>
                      <th class="py-3 px-4">Categoria</th>
                      <th class="py-3 px-4">Vigência</th>
                      <th class="py-3 px-4">Beneficiários</th>
                      <th class="py-3 px-4">Situação</th>
                      <th class="py-3 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800 text-slate-300">
                    @for (proj of dataService.projects(); track proj.id) {
                      <tr class="hover:bg-slate-900/40">
                        <td class="py-3.5 px-4 font-bold text-white max-w-xs">{{ proj.title }}</td>
                        <td class="py-3.5 px-4">{{ proj.category }}</td>
                        <td class="py-3.5 px-4 font-mono">{{ proj.period }}</td>
                        <td class="py-3.5 px-4 font-mono">{{ proj.beneficiariesCount }} pessoas</td>
                        <td class="py-3.5 px-4">
                          <span class="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
                            {{ proj.status }}
                          </span>
                        </td>
                        <td class="py-3.5 px-4 text-right">
                          <button 
                            (click)="dataService.deleteProject(proj.id); notification.show('Projeto removido com sucesso!', 'info')"
                            class="p-1 rounded text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                            title="Remover Projeto"
                          >
                            <mat-icon class="text-sm">delete</mat-icon>
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>

            </div>
          }

          <!-- SECTION 3: TRANSPARÊNCIA & MROSC -->
          @if (activeSection() === 'transparencia') {
            <div class="space-y-6 max-w-6xl">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 class="text-xl font-bold text-white">Gestão da Transparência & Instrumentos Públicos</h2>
                  <p class="text-xs text-slate-400">Controle de Termos de Fomento, Colaboração, Emendas, Relatórios e Lançamentos Financeiros.</p>
                </div>
                <div class="flex items-center gap-2">
                  <button 
                    (click)="showNewInstrumentForm.set(!showNewInstrumentForm())"
                    class="px-3.5 py-2 rounded-xl bg-[#079F50] hover:bg-[#057d3e] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <mat-icon class="text-sm">add</mat-icon>
                    <span>Novo Instrumento MROSC</span>
                  </button>
                  <button 
                    (click)="showNewFinanceForm.set(!showNewFinanceForm())"
                    class="px-3.5 py-2 rounded-xl bg-[#32A5E8] hover:bg-[#1b8dcd] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <mat-icon class="text-sm">receipt</mat-icon>
                    <span>Novo Lançamento Financeiro</span>
                  </button>
                </div>
              </div>

              <!-- New Instrument Form -->
              @if (showNewInstrumentForm()) {
                <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 animate-fade-in">
                  <h3 class="text-sm font-bold text-white">Cadastrar Novo Instrumento Público (Lei 13.019/2014)</h3>
                  <form [formGroup]="instrumentForm" (ngSubmit)="onCreateInstrument()" class="space-y-4 text-xs">
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div class="space-y-1">
                        <label for="admInstNumber" class="font-bold text-slate-300">Número do Instrumento *</label>
                        <input 
                          id="admInstNumber"
                          type="text" 
                          formControlName="number"
                          placeholder="Ex: TF nº 005/2026"
                          class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                      <div class="space-y-1">
                        <label for="admInstType" class="font-bold text-slate-300">Tipo de Parceria *</label>
                        <select id="admInstType" formControlName="type" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white">
                          <option value="Termo de Fomento">Termo de Fomento</option>
                          <option value="Termo de Colaboração">Termo de Colaboração</option>
                          <option value="Emenda Parlamentar">Emenda Parlamentar</option>
                          <option value="Acordo de Cooperação">Acordo de Cooperação</option>
                        </select>
                      </div>
                      <div class="space-y-1">
                        <label for="admInstGranting" class="font-bold text-slate-300">Órgão Concedente *</label>
                        <input 
                          id="admInstGranting"
                          type="text" 
                          formControlName="grantingBody"
                          placeholder="Ex: Secretaria de Educação / Prefeitura"
                          class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div class="space-y-1">
                        <label for="admInstValue" class="font-bold text-slate-300">Valor Global Repassado (R$) *</label>
                        <input 
                          id="admInstValue"
                          type="number" 
                          formControlName="totalValue"
                          placeholder="50000"
                          class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                        />
                      </div>
                      <div class="space-y-1">
                        <label for="admInstStart" class="font-bold text-slate-300">Início da Vigência *</label>
                        <input 
                          id="admInstStart"
                          type="text" 
                          formControlName="startDate"
                          placeholder="DD/MM/AAAA"
                          class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                        />
                      </div>
                      <div class="space-y-1">
                        <label for="admInstEnd" class="font-bold text-slate-300">Término da Vigência *</label>
                        <input 
                          id="admInstEnd"
                          type="text" 
                          formControlName="endDate"
                          placeholder="DD/MM/AAAA"
                          class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                        />
                      </div>
                    </div>

                    <div class="space-y-1">
                      <label for="admInstObject" class="font-bold text-slate-300">Objeto da Parceria *</label>
                      <textarea 
                        id="admInstObject"
                        rows="2"
                        formControlName="object"
                        placeholder="Descrição formal do objeto da parceria..."
                        class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      ></textarea>
                    </div>

                    <div class="flex items-center gap-3">
                      <button 
                        type="submit" 
                        [disabled]="instrumentForm.invalid"
                        class="px-6 py-2.5 rounded-xl bg-[#079F50] text-white font-semibold cursor-pointer disabled:opacity-50"
                      >
                        Salvar Instrumento
                      </button>
                      <button 
                        type="button" 
                        (click)="showNewInstrumentForm.set(false)" 
                        class="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              }

              <!-- Instruments List -->
              <div class="space-y-3">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Instrumentos Cadastrados:</span>
                @for (inst of dataService.instruments(); track inst.id) {
                  <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-emerald-400">{{ inst.number }}</span>
                        <span class="text-slate-500">·</span>
                        <span class="text-xs text-slate-400">{{ inst.type }}</span>
                        <span class="text-slate-500">·</span>
                        <span class="text-xs text-slate-400">{{ inst.grantingBody }}</span>
                      </div>
                      <p class="text-xs text-slate-300 line-clamp-1">{{ inst.object }}</p>
                      <p class="text-[11px] font-mono text-slate-400">
                        Valor: R$ {{ inst.totalValue.toLocaleString('pt-BR') }} | Vigência: {{ inst.startDate }} a {{ inst.endDate }}
                      </p>
                    </div>

                    <div class="flex items-center gap-2 shrink-0">
                      <span class="px-2.5 py-1 rounded text-[11px] font-bold bg-slate-900 text-slate-300 border border-slate-800">
                        {{ inst.status }}
                      </span>
                      <button 
                        (click)="dataService.deleteInstrument(inst.id); notification.show('Instrumento removido.', 'info')"
                        class="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Remover"
                      >
                        <mat-icon class="text-base">delete</mat-icon>
                      </button>
                    </div>
                  </div>
                }
              </div>

            </div>
          }

          <!-- SECTION 4: NOTÍCIAS & COMUNICADOS -->
          @if (activeSection() === 'noticias') {
            <div class="space-y-6 max-w-6xl">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 class="text-xl font-bold text-white">Gestão de Notícias & Publicações</h2>
                  <p class="text-xs text-slate-400">Publique comunicados, matérias institucionais e coberturas fotográficas.</p>
                </div>
                <button 
                  (click)="showNewNewsForm.set(!showNewNewsForm())"
                  class="px-4 py-2 rounded-xl bg-[#079F50] hover:bg-[#057d3e] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <mat-icon class="text-sm">{{ showNewNewsForm() ? 'close' : 'add' }}</mat-icon>
                  <span>{{ showNewNewsForm() ? 'Fechar' : 'Nova Notícia' }}</span>
                </button>
              </div>

              <!-- New News Form -->
              @if (showNewNewsForm()) {
                <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 animate-fade-in">
                  <h3 class="text-sm font-bold text-white">Criar Nova Publicação</h3>
                  <form [formGroup]="newsForm" (ngSubmit)="onCreateNews()" class="space-y-4 text-xs">
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div class="sm:col-span-2 space-y-1">
                        <label for="admNewsTitle" class="font-bold text-slate-300">Título da Notícia *</label>
                        <input 
                          id="admNewsTitle"
                          type="text" 
                          formControlName="title"
                          placeholder="Título chamativo e institucional..."
                          class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                      <div class="space-y-1">
                        <label for="admNewsCategory" class="font-bold text-slate-300">Categoria *</label>
                        <select id="admNewsCategory" formControlName="category" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white">
                          <option value="Notícia">Notícia</option>
                          <option value="Comunicado Oficial">Comunicado Oficial</option>
                          <option value="Evento">Evento</option>
                          <option value="Campanha">Campanha</option>
                        </select>
                      </div>
                    </div>

                    <div class="space-y-1">
                      <label for="admNewsSummary" class="font-bold text-slate-300">Resumo / Subtítulo *</label>
                      <input 
                        id="admNewsSummary"
                        type="text" 
                        formControlName="summary"
                        placeholder="Breve linha descritiva para a listagem..."
                        class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>

                    <div class="space-y-1">
                      <label for="admNewsContent" class="font-bold text-slate-300">Conteúdo Completo *</label>
                      <textarea 
                        id="admNewsContent"
                        rows="4"
                        formControlName="content"
                        placeholder="Texto da matéria ou comunicado oficial..."
                        class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      [disabled]="newsForm.invalid"
                      class="px-6 py-2.5 rounded-xl bg-[#079F50] text-white font-semibold cursor-pointer disabled:opacity-50"
                    >
                      Publicar Notícia
                    </button>
                  </form>
                </div>
              }

              <!-- News List -->
              <div class="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
                <table class="w-full text-left text-xs">
                  <thead class="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th class="py-3 px-4">Título</th>
                      <th class="py-3 px-4">Categoria</th>
                      <th class="py-3 px-4">Data</th>
                      <th class="py-3 px-4">Autor</th>
                      <th class="py-3 px-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800 text-slate-300">
                    @for (item of dataService.news(); track item.id) {
                      <tr class="hover:bg-slate-900/40">
                        <td class="py-3.5 px-4 font-bold text-white max-w-sm truncate">{{ item.title }}</td>
                        <td class="py-3.5 px-4">
                          <span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                            {{ item.category }}
                          </span>
                        </td>
                        <td class="py-3.5 px-4 font-mono text-slate-400">{{ item.publishedAt }}</td>
                        <td class="py-3.5 px-4 text-slate-400">{{ item.author }}</td>
                        <td class="py-3.5 px-4 text-right">
                          <button 
                            (click)="dataService.deleteNews(item.id); notification.show('Notícia removida.', 'info')"
                            class="p-1 rounded text-rose-400 hover:bg-rose-500/20 transition-colors"
                          >
                            <mat-icon class="text-sm">delete</mat-icon>
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

          <!-- SECTION 5: VOLUNTÁRIOS -->
          @if (activeSection() === 'voluntarios') {
            <div class="space-y-6 max-w-6xl">
              <div>
                <h2 class="text-xl font-bold text-white">Inscrições do Programa de Voluntariado</h2>
                <p class="text-xs text-slate-400">Gerencie candidatos inscritos através do formulário oficial do portal.</p>
              </div>

              <div class="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
                <table class="w-full text-left text-xs">
                  <thead class="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th class="py-3 px-4">Nome do Voluntário</th>
                      <th class="py-3 px-4">Contato</th>
                      <th class="py-3 px-4">Área de Interesse</th>
                      <th class="py-3 px-4">Disponibilidade</th>
                      <th class="py-3 px-4">Data</th>
                      <th class="py-3 px-4">Status</th>
                      <th class="py-3 px-4 text-right">Mudar Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800 text-slate-300">
                    @for (vol of dataService.volunteers(); track vol.id) {
                      <tr class="hover:bg-slate-900/40">
                        <td class="py-3.5 px-4 font-bold text-white">
                          {{ vol.fullName }}
                          <span class="block text-[10px] text-slate-500 font-normal">{{ vol.city }}</span>
                        </td>
                        <td class="py-3.5 px-4 text-slate-400 font-mono">
                          {{ vol.phone }}
                          <span class="block text-[10px] font-sans">{{ vol.email }}</span>
                        </td>
                        <td class="py-3.5 px-4">{{ vol.areasOfInterest.join(', ') }}</td>
                        <td class="py-3.5 px-4 font-mono">{{ vol.availability }} ({{ vol.weeklyHours }}h/sem)</td>
                        <td class="py-3.5 px-4 font-mono text-slate-500">{{ vol.submittedAt }}</td>
                        <td class="py-3.5 px-4">
                          <span 
                            class="px-2 py-0.5 rounded text-[10px] font-bold"
                            [class.bg-sky-500/20]="vol.status === 'Novo'"
                            [class.text-sky-400]="vol.status === 'Novo'"
                            [class.bg-emerald-500/20]="vol.status === 'Aprovado'"
                            [class.text-emerald-400]="vol.status === 'Aprovado'"
                            [class.bg-purple-500/20]="vol.status === 'Contatado'"
                            [class.text-purple-400]="vol.status === 'Contatado'"
                          >
                            {{ vol.status }}
                          </span>
                        </td>
                        <td class="py-3.5 px-4 text-right space-x-1">
                          <button 
                            (click)="dataService.updateVolunteerStatus(vol.id, 'Aprovado'); notification.show('Voluntário Aprovado!', 'success')"
                            class="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-[10px] font-semibold"
                          >
                            Aprovar
                          </button>
                          <button 
                            (click)="dataService.updateVolunteerStatus(vol.id, 'Contatado'); notification.show('Status atualizado para Contatado', 'info')"
                            class="px-2 py-1 rounded bg-sky-500/20 text-sky-400 hover:bg-sky-500/30 text-[10px] font-semibold"
                          >
                            Contatado
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

          <!-- SECTION 6: CONFIGURAÇÕES & INDICADORES -->
          @if (activeSection() === 'configuracoes') {
            <div class="space-y-8 max-w-4xl">
              <div>
                <h2 class="text-xl font-bold text-white">Configurações Institucionais & Indicadores Sociais</h2>
                <p class="text-xs text-slate-400">Edição dos dados cadastrais, indicadores da página inicial e chaves financeiras.</p>
              </div>

              <!-- Indicators Edit Form -->
              <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <mat-icon class="text-[#079F50] text-base">analytics</mat-icon>
                  <span>Indicadores Sociais da Home (Editáveis em Tempo Real)</span>
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  @for (ind of dataService.indicators(); track ind.id) {
                    <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-slate-300">{{ ind.label }}</span>
                        <span class="text-[10px] text-slate-500">Última: {{ ind.lastUpdated }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <input 
                          type="number" 
                          [value]="ind.value"
                          #valInput
                          class="w-24 px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono font-bold"
                        />
                        <button 
                          (click)="dataService.updateSocialIndicator(ind.id, +valInput.value); notification.show('Indicador atualizado!', 'success')"
                          class="px-3 py-1 rounded-lg bg-[#079F50] hover:bg-[#057d3e] text-white font-semibold cursor-pointer"
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- PIX & Entidade Settings -->
              <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <mat-icon class="text-[#32A5E8] text-base">payments</mat-icon>
                  <span>Chave PIX e Contatos Oficiais</span>
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label for="admPixInput" class="font-bold text-slate-400">Chave PIX Oficial</label>
                    <input 
                      id="admPixInput"
                      type="text" 
                      [value]="dataService.institution().donationInfo.pixKey"
                      #pixInput
                      class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                    />
                  </div>

                  <div class="space-y-1">
                    <label for="admPhoneInput" class="font-bold text-slate-400">WhatsApp de Atendimento</label>
                    <input 
                      id="admPhoneInput"
                      type="text" 
                      [value]="dataService.institution().contact.phone"
                      #phoneInput
                      class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                <button 
                  (click)="saveContactSettings(pixInput.value, phoneInput.value)"
                  class="px-5 py-2 rounded-xl bg-[#079F50] text-white font-semibold cursor-pointer"
                >
                  Atualizar Dados Institucionais
                </button>
              </div>
            </div>
          }

          <!-- SECTION 7: TRILHA DE AUDITORIA & REGISTROS -->
          @if (activeSection() === 'auditoria') {
            <div class="space-y-6 max-w-6xl">
              <div>
                <h2 class="text-xl font-bold text-white">Trilha de Auditoria & Registro de Operações</h2>
                <p class="text-xs text-slate-400">Registro cronológico imutável de todas as modificações, publicações e acessos para conformidade MROSC.</p>
              </div>

              <div class="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
                <table class="w-full text-left text-xs">
                  <thead class="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th class="py-3 px-4">Carimbo de Data/Hora</th>
                      <th class="py-3 px-4">Usuário Responsável</th>
                      <th class="py-3 px-4">Perfil</th>
                      <th class="py-3 px-4">Ação</th>
                      <th class="py-3 px-4">Entidade / Objeto</th>
                      <th class="py-3 px-4">Detalhes da Operação</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800 text-slate-300">
                    @for (log of dataService.auditLogs(); track log.id) {
                      <tr class="hover:bg-slate-900/40">
                        <td class="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">{{ log.timestamp }}</td>
                        <td class="py-3.5 px-4 font-semibold text-white">{{ log.user }}</td>
                        <td class="py-3.5 px-4">
                          <span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">
                            {{ log.role }}
                          </span>
                        </td>
                        <td class="py-3.5 px-4">
                          <span 
                            class="px-2 py-0.5 rounded text-[10px] font-bold"
                            [class.bg-emerald-500/20]="log.action === 'Criação' || log.action === 'Publicação'"
                            [class.text-emerald-400]="log.action === 'Criação' || log.action === 'Publicação'"
                            [class.bg-sky-500/20]="log.action === 'Edição'"
                            [class.text-sky-400]="log.action === 'Edição'"
                            [class.bg-rose-500/20]="log.action === 'Exclusão'"
                            [class.text-rose-400]="log.action === 'Exclusão'"
                          >
                            {{ log.action }}
                          </span>
                        </td>
                        <td class="py-3.5 px-4 font-medium text-slate-200">{{ log.entity }}: {{ log.entityTitle }}</td>
                        <td class="py-3.5 px-4 text-slate-400">{{ log.details }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }

        </main>

      </div>
    </div>
  `
})
export class AdminComponent {
  readonly dataService = inject(DataService);
  readonly notification = inject(NotificationService);

  readonly activeSection = signal<AdminSection>('dashboard');
  readonly showNewProjectForm = signal<boolean>(false);
  readonly showNewNewsForm = signal<boolean>(false);
  readonly showNewInstrumentForm = signal<boolean>(false);
  readonly showNewFinanceForm = signal<boolean>(false);

  // Forms
  readonly projectForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl<ProjectCategory>('Educação', [Validators.required]),
    targetPublic: new FormControl('', [Validators.required]),
    period: new FormControl('2026 - 2027', [Validators.required]),
    shortDescription: new FormControl('', [Validators.required])
  });

  readonly newsForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl<NewsCategory>('Notícia', [Validators.required]),
    summary: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  });

  readonly instrumentForm = new FormGroup({
    number: new FormControl('', [Validators.required]),
    type: new FormControl<InstrumentType>('Termo de Fomento', [Validators.required]),
    grantingBody: new FormControl('', [Validators.required]),
    totalValue: new FormControl<number>(50000, [Validators.required]),
    startDate: new FormControl('01/01/2026', [Validators.required]),
    endDate: new FormControl('31/12/2026', [Validators.required]),
    object: new FormControl('', [Validators.required])
  });

  onRoleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.dataService.switchUserRole(select.value as UserRole);
    this.notification.show(`Perfil de usuário alterado para "${select.value}"`, 'info');
  }

  onCreateProject() {
    if (this.projectForm.invalid) return;
    const v = this.projectForm.value;
    this.dataService.addProject({
      title: v.title!,
      category: v.category as ProjectCategory,
      status: 'Em Execução',
      shortDescription: v.shortDescription!,
      fullDescription: v.shortDescription!,
      objectives: ['Desenvolvimento comunitário em Padre Lúcio', 'Atendimento direto às famílias'],
      targetPublic: v.targetPublic!,
      beneficiariesCount: 80,
      period: v.period!,
      startDate: '01/01/2026',
      partners: ['Instituto Raízes da Comunidade', 'Comunidade Local'],
      results: ['Atividades iniciadas com regularidade.'],
      metrics: [{ label: 'Beneficiários', value: '80 pessoas' }],
      imageUrl: '/src/assets/images/hero_community_roots_1794165964918.jpg',
      featured: false
    });
    this.showNewProjectForm.set(false);
    this.projectForm.reset({ category: 'Educação', period: '2026 - 2027' });
    this.notification.show('Projeto cadastrado com sucesso no catálogo!', 'success');
  }

  onCreateNews() {
    if (this.newsForm.invalid) return;
    const v = this.newsForm.value;
    this.dataService.addNews({
      title: v.title!,
      category: v.category as NewsCategory,
      summary: v.summary!,
      content: v.content!,
      publishedAt: new Date().toLocaleDateString('pt-BR'),
      author: this.dataService.currentUser().name,
      imageUrl: '/src/assets/images/project_education_kids_1794165964654.jpg',
      tags: ['Institucional', 'Padre Lúcio'],
      featured: false
    });
    this.showNewNewsForm.set(false);
    this.newsForm.reset({ category: 'Notícia' });
    this.notification.show('Notícia publicada com sucesso!', 'success');
  }

  onCreateInstrument() {
    if (this.instrumentForm.invalid) return;
    const v = this.instrumentForm.value;
    this.dataService.addInstrument({
      number: v.number!,
      type: v.type as InstrumentType,
      grantingBody: v.grantingBody!,
      object: v.object!,
      totalValue: v.totalValue || 50000,
      executedValue: 0,
      startDate: v.startDate!,
      endDate: v.endDate!,
      status: 'Vigente',
      processNumber: `SEI-${Date.now().toString().slice(-6)} (Demonstrativo)`,
      responsibleManager: 'Gestor da Parceria',
      workPlanSummary: 'Plano de Trabalho em execução.',
      relatedDocuments: []
    });
    this.showNewInstrumentForm.set(false);
    this.instrumentForm.reset({ type: 'Termo de Fomento', totalValue: 50000 });
    this.notification.show('Novo instrumento público registrado!', 'success');
  }

  saveContactSettings(pix: string, phone: string) {
    this.dataService.updateInstitutionProfile({
      donationInfo: {
        ...this.dataService.institution().donationInfo,
        pixKey: pix
      },
      contact: {
        ...this.dataService.institution().contact,
        phone
      }
    });
    this.notification.show('Configurações institucionais salvas com sucesso!', 'success');
  }
}
