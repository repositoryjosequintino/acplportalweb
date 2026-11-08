import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { TransparencyDocument } from '../../models/transparency.model';

type TransparencyTab = 'documentos' | 'instrumentos' | 'financeiro' | 'fornecedores' | 'governanca';

@Component({
  selector: 'app-transparency',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Header -->
    <section class="bg-white border-b border-slate-100 py-12 lg:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#079F50] text-xs font-semibold">
            <mat-icon class="text-xs !text-[14px]">verified_user</mat-icon>
            <span>TRANSPARÊNCIA ATIVA & CONTROLE SOCIAL</span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Portal da Transparência
          </h1>

          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            Acesso público a convênios, termos de fomento e colaboração (Lei Federal nº 13.019/2014 - MROSC), emendas parlamentares, demonstrativos de receitas e despesas, fornecedores e prestações de contas da Associação Comunitária de Padre Lúcio - Instituto Raízes da Comunidade.
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500">
            <span>Regulamentação: <strong>Lei 13.019/2014</strong></span>
            <span>·</span>
            <span>Decreto Federal 8.726/2016</span>
            <span>·</span>
            <span>LGPD (Lei 13.709/2018)</span>
          </div>
        </div>

        <!-- Executive Metrics Bar (Apple Style Clean Numbers) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 pt-8 border-t border-slate-100">
          <div class="p-5 rounded-2xl bg-[#fafbfc] border border-slate-200/80 space-y-1">
            <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Recursos em Gestão</span>
            <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              R$ {{ dataService.financialKpis().publicTransferred.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
            </p>
            <span class="text-[10px] text-slate-400 block">Instrumentos públicos contratados</span>
          </div>

          <div class="p-5 rounded-2xl bg-[#fafbfc] border border-slate-200/80 space-y-1">
            <span class="text-[11px] font-semibold text-[#079F50] uppercase tracking-wide">Recursos Executados</span>
            <p class="text-2xl sm:text-3xl font-extrabold text-[#079F50] tabular-nums">
              R$ {{ dataService.financialKpis().publicExecuted.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
            </p>
            <span class="text-[10px] text-slate-400 block">{{ dataService.financialKpis().executionRate.toFixed(1) }}% de execução física e financeira</span>
          </div>

          <div class="p-5 rounded-2xl bg-[#fafbfc] border border-slate-200/80 space-y-1">
            <span class="text-[11px] font-semibold text-[#32A5E8] uppercase tracking-wide">Instrumentos Públicos</span>
            <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {{ dataService.instruments().length }}
            </p>
            <span class="text-[10px] text-slate-400 block">Termos MROSC e Emendas</span>
          </div>

          <div class="p-5 rounded-2xl bg-[#fafbfc] border border-slate-200/80 space-y-1">
            <span class="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">Documentos Disponíveis</span>
            <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              {{ dataService.documents().length }}
            </p>
            <span class="text-[10px] text-emerald-600 block flex items-center gap-1 font-medium">
              <mat-icon class="text-xs !text-[13px]">check_circle</mat-icon>
              Certidões e balanços em dia
            </span>
          </div>
        </div>

      </div>
    </section>

    <!-- Main Navigation & Filter Area -->
    <main class="py-10 bg-[#fafbfc] min-h-[75vh]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <!-- Controls: Tabs + Search + Year Filter -->
        <div class="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <!-- Segmented Tabs -->
            <div class="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-2xl">
              <button 
                (click)="activeTab.set('documentos')"
                class="px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                [class.bg-white]="activeTab() === 'documentos'"
                [class.text-slate-900]="activeTab() === 'documentos'"
                [class.shadow-2xs]="activeTab() === 'documentos'"
                [class.text-slate-600]="activeTab() !== 'documentos'"
              >
                <mat-icon class="text-sm">folder_open</mat-icon>
                <span>Acervo Documental ({{ filteredDocuments().length }})</span>
              </button>

              <button 
                (click)="activeTab.set('instrumentos')"
                class="px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                [class.bg-white]="activeTab() === 'instrumentos'"
                [class.text-slate-900]="activeTab() === 'instrumentos'"
                [class.shadow-2xs]="activeTab() === 'instrumentos'"
                [class.text-slate-600]="activeTab() !== 'instrumentos'"
              >
                <mat-icon class="text-sm">account_balance</mat-icon>
                <span>Convênios & Parcerias MROSC ({{ dataService.instruments().length }})</span>
              </button>

              <button 
                (click)="activeTab.set('financeiro')"
                class="px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                [class.bg-white]="activeTab() === 'financeiro'"
                [class.text-slate-900]="activeTab() === 'financeiro'"
                [class.shadow-2xs]="activeTab() === 'financeiro'"
                [class.text-slate-600]="activeTab() !== 'financeiro'"
              >
                <mat-icon class="text-sm">receipt_long</mat-icon>
                <span>Demonstrativo Financeiro ({{ filteredFinancialRecords().length }})</span>
              </button>

              <button 
                (click)="activeTab.set('fornecedores')"
                class="px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                [class.bg-white]="activeTab() === 'fornecedores'"
                [class.text-slate-900]="activeTab() === 'fornecedores'"
                [class.shadow-2xs]="activeTab() === 'fornecedores'"
                [class.text-slate-600]="activeTab() !== 'fornecedores'"
              >
                <mat-icon class="text-sm">storefront</mat-icon>
                <span>Fornecedores & Cotações</span>
              </button>

              <button 
                (click)="activeTab.set('governanca')"
                class="px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                [class.bg-white]="activeTab() === 'governanca'"
                [class.text-slate-900]="activeTab() === 'governanca'"
                [class.shadow-2xs]="activeTab() === 'governanca'"
                [class.text-slate-600]="activeTab() !== 'governanca'"
              >
                <mat-icon class="text-sm">gavel</mat-icon>
                <span>Governança & Atas</span>
              </button>
            </div>

            <!-- Global Search & Year -->
            <div class="flex items-center gap-3">
              <!-- Search -->
              <div class="relative w-full sm:w-64">
                <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</mat-icon>
                <input 
                  type="text" 
                  placeholder="Filtrar por objeto, órgão, número..." 
                  [value]="searchTerm()"
                  (input)="onSearchInput($event)"
                  class="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:border-[#079F50]"
                />
              </div>

              <!-- Year select -->
              <select 
                [value]="selectedYear()"
                (change)="onYearChange($event)"
                class="py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20"
              >
                <option value="Todos">Todos os Anos</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>

              <!-- Export Button -->
              <button 
                (click)="exportCurrentView()"
                class="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                title="Exportar dados atuais para CSV"
              >
                <mat-icon class="text-sm">download</mat-icon>
                <span class="hidden sm:inline">Exportar CSV</span>
              </button>
            </div>

          </div>
        </div>

        <!-- TAB 1: ACERVO DOCUMENTAL (Estatuto, Certidões, Relatórios, Balanços) -->
        @if (activeTab() === 'documentos') {
          <div class="space-y-4">
            
            <!-- Category Pills Filter for Documents -->
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-semibold text-slate-400">Filtrar Categoria:</span>
              <button 
                (click)="docCategoryFilter.set('Todos')"
                class="text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                [class.bg-slate-900]="docCategoryFilter() === 'Todos'"
                [class.text-white]="docCategoryFilter() === 'Todos'"
                [class.bg-white]="docCategoryFilter() !== 'Todos'"
                [class.text-slate-600]="docCategoryFilter() !== 'Todos'"
              >
                Todas ({{ dataService.documents().length }})
              </button>
              @for (cat of documentCategories; track cat) {
                <button 
                  (click)="docCategoryFilter.set(cat)"
                  class="text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  [class.bg-slate-900]="docCategoryFilter() === cat"
                  [class.text-white]="docCategoryFilter() === cat"
                  [class.bg-white]="docCategoryFilter() !== cat"
                  [class.text-slate-600]="docCategoryFilter() !== cat"
                >
                  {{ cat }}
                </button>
              }
            </div>

            <!-- Documents Table/Grid -->
            <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div class="divide-y divide-slate-100">
                @for (doc of filteredDocuments(); track doc.id) {
                  <div class="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                    
                    <div class="flex items-start gap-4">
                      <div class="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        <mat-icon class="text-xl">description</mat-icon>
                      </div>

                      <div class="space-y-1">
                        <div class="flex flex-wrap items-center gap-2 text-[11px]">
                          <span class="font-semibold text-[#079F50]">{{ doc.category }}</span>
                          <span class="text-slate-300">·</span>
                          <span class="text-slate-500">Exercício {{ doc.year }}</span>
                          <span class="text-slate-300">·</span>
                          <span class="text-slate-400">Postado em {{ doc.uploadDate }}</span>
                          @if (doc.expirationDate) {
                            <span class="text-slate-300">·</span>
                            <span class="text-amber-600 font-medium">Validade: {{ doc.expirationDate }}</span>
                          }
                        </div>

                        <h3 class="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {{ doc.title }}
                        </h3>

                        @if (doc.description) {
                          <p class="text-xs text-slate-500 leading-relaxed max-w-2xl">
                            {{ doc.description }}
                          </p>
                        }

                        <div class="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                          <span>Formato: {{ doc.fileType }} ({{ doc.fileSize }})</span>
                          @if (doc.hashSha256) {
                            <span class="hidden md:inline">· SHA256: {{ doc.hashSha256.substring(0, 16) }}...</span>
                          }
                        </div>
                      </div>
                    </div>

                    <!-- Action buttons -->
                    <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button 
                        (click)="previewDocument(doc)"
                        class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Ver detalhes e autenticidade"
                      >
                        <mat-icon class="text-sm">visibility</mat-icon>
                        <span>Visualizar</span>
                      </button>

                      <button 
                        (click)="downloadDocSimulated(doc)"
                        class="px-3.5 py-2 rounded-xl bg-[#079F50] hover:bg-[#057d3e] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                        title="Baixar arquivo oficial"
                      >
                        <mat-icon class="text-sm">file_download</mat-icon>
                        <span>Baixar {{ doc.fileType }}</span>
                      </button>
                    </div>

                  </div>
                } @empty {
                  <div class="p-12 text-center text-slate-500 space-y-2">
                    <mat-icon class="text-4xl text-slate-300">folder_off</mat-icon>
                    <p class="text-sm font-semibold">Nenhum documento encontrado com os filtros selecionados.</p>
                  </div>
                }
              </div>
            </div>

          </div>
        }

        <!-- TAB 2: CONVÊNIOS & PARCERIAS MROSC -->
        @if (activeTab() === 'instrumentos') {
          <div class="space-y-6">
            
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-[#057d3e] flex items-start gap-3">
              <mat-icon class="text-base shrink-0 mt-0.5">info</mat-icon>
              <div>
                <strong>Aviso de Conformidade MROSC (Lei nº 13.019/2014):</strong>
                Em atenção ao Art. 10 da referida lei, disponibilizamos a relação de todas as parcerias celebradas com a administração pública, constando objeto, número do instrumento, órgão concedente, valores repassados e executados, vigência e situação das prestações de contas.
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6">
              @for (inst of filteredInstruments(); track inst.id) {
                <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
                  
                  <!-- Top Row: Instrument Number, Type and Status -->
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-[#079F50] uppercase tracking-wider">{{ inst.type }}</span>
                        <span class="text-slate-300">·</span>
                        <span class="text-xs font-mono text-slate-500">{{ inst.processNumber }}</span>
                      </div>
                      <h2 class="text-xl font-extrabold text-slate-900">{{ inst.number }}</h2>
                    </div>

                    <div class="flex items-center gap-3">
                      <span 
                        class="px-3 py-1 rounded-full text-xs font-bold"
                        [class.bg-emerald-100]="inst.status === 'Vigente' || inst.status === 'Concluído e Aprovado'"
                        [class.text-emerald-800]="inst.status === 'Vigente' || inst.status === 'Concluído e Aprovado'"
                        [class.bg-amber-100]="inst.status === 'Em Prestação de Contas'"
                        [class.text-amber-800]="inst.status === 'Em Prestação de Contas'"
                      >
                        {{ inst.status }}
                      </span>
                    </div>
                  </div>

                  <!-- Details Grid -->
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <span class="text-[10px] uppercase font-bold text-slate-400">Órgão Concedente</span>
                      <p class="font-semibold text-slate-800 leading-snug">{{ inst.grantingBody }}</p>
                    </div>

                    <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <span class="text-[10px] uppercase font-bold text-slate-400">Vigência</span>
                      <p class="font-semibold text-slate-800">{{ inst.startDate }} até {{ inst.endDate }}</p>
                    </div>

                    <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <span class="text-[10px] uppercase font-bold text-slate-400">Valor Global Repassado</span>
                      <p class="font-bold text-slate-900 text-sm tabular-nums">
                        R$ {{ inst.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
                      </p>
                    </div>

                    <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <span class="text-[10px] uppercase font-bold text-slate-400">Valor Executado</span>
                      <p class="font-bold text-[#079F50] text-sm tabular-nums">
                        R$ {{ inst.executedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
                      </p>
                    </div>
                  </div>

                  <!-- Progress Bar -->
                  <div class="space-y-1.5">
                    <div class="flex justify-between text-xs text-slate-500 font-medium">
                      <span>Execução Financeira:</span>
                      <span class="font-bold text-slate-800">{{ ((inst.executedValue / inst.totalValue) * 100).toFixed(1) }}%</span>
                    </div>
                    <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        class="bg-[#079F50] h-full rounded-full transition-all duration-500"
                        [style.width.%]="(inst.executedValue / inst.totalValue) * 100"
                      ></div>
                    </div>
                  </div>

                  <!-- Objeto -->
                  <div class="space-y-1">
                    <span class="text-xs uppercase font-bold text-slate-500">Objeto da Parceria</span>
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">{{ inst.object }}</p>
                  </div>

                  <!-- Work Plan Summary -->
                  <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                    <span class="font-bold text-slate-800">Resumo do Plano de Trabalho:</span>
                    <p>{{ inst.workPlanSummary }}</p>
                  </div>

                  <!-- Related Documents -->
                  <div class="space-y-2 pt-2">
                    <span class="text-xs font-bold text-slate-900 block">Documentos e Comprovantes Vinculados:</span>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      @for (file of inst.relatedDocuments; track file.title) {
                        <button 
                          (click)="downloadRelatedFile(file)"
                          class="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-left transition-all flex items-center justify-between gap-2 cursor-pointer group"
                        >
                          <div class="truncate">
                            <span class="text-xs font-semibold text-slate-800 group-hover:text-[#079F50] truncate block">
                              {{ file.title }}
                            </span>
                            <span class="text-[10px] text-slate-400 font-mono">{{ file.type }} · {{ file.size }}</span>
                          </div>
                          <mat-icon class="text-slate-400 group-hover:text-[#079F50] text-sm shrink-0">download</mat-icon>
                        </button>
                      }
                    </div>
                  </div>

                </div>
              }
            </div>

          </div>
        }

        <!-- TAB 3: DEMONSTRATIVO FINANCEIRO (Receitas e Despesas com filtros de fornecedor, categoria, ano) -->
        @if (activeTab() === 'financeiro') {
          <div class="space-y-6">
            
            <!-- Filters Ribbon for Financial Records -->
            <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
              <div class="flex items-center gap-3">
                <span class="font-bold text-slate-700">Tipo de Movimentação:</span>
                <button 
                  (click)="finTypeFilter.set('Todos')"
                  class="px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                  [class.bg-slate-900]="finTypeFilter() === 'Todos'"
                  [class.text-white]="finTypeFilter() === 'Todos'"
                  [class.bg-slate-100]="finTypeFilter() !== 'Todos'"
                  [class.text-slate-700]="finTypeFilter() !== 'Todos'"
                >
                  Todas
                </button>
                <button 
                  (click)="finTypeFilter.set('Receita')"
                  class="px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                  [class.bg-emerald-600]="finTypeFilter() === 'Receita'"
                  [class.text-white]="finTypeFilter() === 'Receita'"
                  [class.bg-slate-100]="finTypeFilter() !== 'Receita'"
                  [class.text-slate-700]="finTypeFilter() !== 'Receita'"
                >
                  Receitas
                </button>
                <button 
                  (click)="finTypeFilter.set('Despesa')"
                  class="px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                  [class.bg-rose-600]="finTypeFilter() === 'Despesa'"
                  [class.text-white]="finTypeFilter() === 'Despesa'"
                  [class.bg-slate-100]="finTypeFilter() !== 'Despesa'"
                  [class.text-slate-700]="finTypeFilter() !== 'Despesa'"
                >
                  Despesas
                </button>
              </div>

              <div class="flex items-center gap-4 text-xs">
                <span class="text-slate-500">Total Filtrado:</span>
                <span class="font-extrabold text-slate-900 text-sm tabular-nums">
                  R$ {{ filteredFinancialTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
                </span>
              </div>
            </div>

            <!-- Financial Table -->
            <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                    <th class="py-3.5 px-4">Data</th>
                    <th class="py-3.5 px-4">Tipo</th>
                    <th class="py-3.5 px-4">Categoria</th>
                    <th class="py-3.5 px-4">Descrição da Despesa / Receita</th>
                    <th class="py-3.5 px-4">Fornecedor / Concedente</th>
                    <th class="py-3.5 px-4">Instrumento</th>
                    <th class="py-3.5 px-4">Nº NF / Recibo</th>
                    <th class="py-3.5 px-4 text-right">Valor (R$)</th>
                    <th class="py-3.5 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700">
                  @for (rec of filteredFinancialRecords(); track rec.id) {
                    <tr class="hover:bg-slate-50/70 transition-colors">
                      <td class="py-3 px-4 font-mono whitespace-nowrap text-slate-500">{{ rec.date }}</td>
                      <td class="py-3 px-4 whitespace-nowrap">
                        <span 
                          class="px-2 py-0.5 rounded text-[10px] font-bold"
                          [class.bg-emerald-100]="rec.type === 'Receita'"
                          [class.text-emerald-800]="rec.type === 'Receita'"
                          [class.bg-rose-100]="rec.type === 'Despesa'"
                          [class.text-rose-800]="rec.type === 'Despesa'"
                        >
                          {{ rec.type }}
                        </span>
                      </td>
                      <td class="py-3 px-4 whitespace-nowrap font-medium text-slate-800">{{ rec.category }}</td>
                      <td class="py-3 px-4 max-w-xs">{{ rec.description }}</td>
                      <td class="py-3 px-4 font-medium">{{ rec.vendorOrFunder }}</td>
                      <td class="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-slate-500">
                        {{ rec.instrumentNumber || 'Recursos Próprios' }}
                      </td>
                      <td class="py-3 px-4 whitespace-nowrap font-mono text-slate-500">
                        {{ rec.invoiceOrReceiptNumber || '-' }}
                      </td>
                      <td 
                        class="py-3 px-4 text-right font-bold tabular-nums whitespace-nowrap"
                        [class.text-emerald-600]="rec.type === 'Receita'"
                        [class.text-slate-900]="rec.type === 'Despesa'"
                      >
                        {{ rec.type === 'Receita' ? '+' : '-' }} R$ {{ rec.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
                      </td>
                      <td class="py-3 px-4 text-center whitespace-nowrap">
                        <span class="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {{ rec.status }}
                        </span>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="9" class="py-12 text-center text-slate-400">
                        Nenhum registro financeiro encontrado para estes critérios.
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

          </div>
        }

        <!-- TAB 4: FORNECEDORES & COTAÇÕES -->
        @if (activeTab() === 'fornecedores') {
          <div class="space-y-6">
            <div class="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-[#1b8dcd] flex items-start gap-3">
              <mat-icon class="text-base shrink-0 mt-0.5">policy</mat-icon>
              <div>
                <strong>Cotações Prévias e Fornecedores Homologados (Art. 42 da Lei 13.019/2014):</strong>
                Para compras e contratações de serviços com recursos públicos de parcerias MROSC, o Instituto adota procedimentos que asseguram compatibilidade com os preços de mercado vigentes, mediante obtenção de no mínimo 3 cotações prévias e comprovação via Nota Fiscal eletrônica.
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <mat-icon class="text-[#079F50] text-base">store</mat-icon>
                  <span>Fornecedores Registrados nas Parcerias</span>
                </h3>
                <div class="divide-y divide-slate-100 text-xs">
                  <div class="py-3 space-y-1">
                    <p class="font-bold text-slate-800">Hortifrúti e Mercearia Padre Lúcio Ltda</p>
                    <p class="text-slate-500">CNPJ: 12.345.678/0001-99 · Fornecimento de alimentos frescos para lanches escolares</p>
                  </div>
                  <div class="py-3 space-y-1">
                    <p class="font-bold text-slate-800">Agropecuária & Sementes Cerrado Ltda</p>
                    <p class="text-slate-500">CNPJ: 98.765.432/0001-11 · Insumos orgânicos, adubo e ferramentas da horta</p>
                  </div>
                  <div class="py-3 space-y-1">
                    <p class="font-bold text-slate-800">Tecnologia & Inclusão Comercial Eireli</p>
                    <p class="text-slate-500">CNPJ: 45.678.901/0001-22 · Equipamentos de informática para oficinas</p>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <mat-icon class="text-[#32A5E8] text-base">request_quote</mat-icon>
                  <span>Dossiês de Cotações Disponíveis</span>
                </h3>
                <div class="space-y-3 text-xs">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p class="font-semibold text-slate-800">Cotação 01/2025: Insumos de Horticultura</p>
                      <p class="text-[10px] text-slate-500">3 propostas comerciais colhidas · Vencedor homologado</p>
                    </div>
                    <button (click)="simulateDownload('Cotacao_01_2025_Insumos.pdf')" class="text-[#079F50] font-bold hover:underline">Baixar</button>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p class="font-semibold text-slate-800">Cotação 02/2025: Instrumentos de Corda & Percussão</p>
                      <p class="text-[10px] text-slate-500">3 orçamentos comparativos · Menor preço selecionado</p>
                    </div>
                    <button (click)="simulateDownload('Cotacao_02_2025_Instrumentos.pdf')" class="text-[#079F50] font-bold hover:underline">Baixar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- TAB 5: GOVERNANÇA & ATAS -->
        @if (activeTab() === 'governanca') {
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <mat-icon class="text-[#079F50] text-base">how_to_reg</mat-icon>
                  <span>Atos de Eleição e Posse Registrados</span>
                </h3>
                <div class="divide-y divide-slate-100 text-xs">
                  <div class="py-3 flex items-center justify-between">
                    <div>
                      <p class="font-bold text-slate-800">Ata de Eleição e Posse da Diretoria (2024-2027)</p>
                      <p class="text-slate-500">Registro Civil de Pessoas Jurídicas</p>
                    </div>
                    <button (click)="simulateDownload('Ata_Posse_2024_2027.pdf')" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold">Baixar PDF</button>
                  </div>
                  <div class="py-3 flex items-center justify-between">
                    <div>
                      <p class="font-bold text-slate-800">Ata da Assembleia Geral de Aprovação de Contas 2025</p>
                      <p class="text-slate-500">Aprovação unânime com parecer favorável do Conselho Fiscal</p>
                    </div>
                    <button (click)="simulateDownload('Ata_Aprovacao_Contas_2025.pdf')" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold">Baixar PDF</button>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <mat-icon class="text-[#32A5E8] text-base">verified</mat-icon>
                  <span>Certidões de Regularidade Fiscal & Trabalhista</span>
                </h3>
                <div class="divide-y divide-slate-100 text-xs">
                  <div class="py-3 flex items-center justify-between">
                    <div>
                      <p class="font-bold text-slate-800">Certidão Negativa de Débitos Federais (CND)</p>
                      <p class="text-emerald-700 font-medium">Situação: Regular (Vigente até 15/03/2027)</p>
                    </div>
                    <button (click)="simulateDownload('CND_Receita_Federal.pdf')" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold">Baixar</button>
                  </div>
                  <div class="py-3 flex items-center justify-between">
                    <div>
                      <p class="font-bold text-slate-800">Certificado de Regularidade FGTS (CRF)</p>
                      <p class="text-amber-700 font-medium">Situação: Válido até 30/11/2026 (Em renovação)</p>
                    </div>
                    <button (click)="simulateDownload('CRF_FGTS_Caixa.pdf')" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold">Baixar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

      </div>
    </main>

    <!-- Document Preview Modal -->
    @if (previewDoc(); as doc) {
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
        role="dialog"
        aria-modal="true"
        tabindex="0"
        (keydown.escape)="closePreview()"
      >
        <!-- Backdrop dismiss click target -->
        <button 
          type="button" 
          class="fixed inset-0 w-full h-full cursor-default bg-transparent border-0" 
          (click)="closePreview()" 
          aria-label="Fechar pré-visualização"
        ></button>

        <div 
          class="relative z-10 bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 text-slate-800"
        >
          <div class="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div class="space-y-1">
              <span class="text-xs font-bold text-[#079F50] uppercase">{{ doc.category }}</span>
              <h3 class="text-lg sm:text-xl font-bold text-slate-900 leading-snug">{{ doc.title }}</h3>
            </div>
            <button (click)="closePreview()" class="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <!-- Document Metadata Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Exercício</span>
              <span class="font-semibold text-slate-800">{{ doc.year }}</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Formato / Tamanho</span>
              <span class="font-semibold text-slate-800">{{ doc.fileType }} ({{ doc.fileSize }})</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Situação</span>
              <span class="font-semibold text-emerald-700">{{ doc.status }}</span>
            </div>
          </div>

          @if (doc.description) {
            <div class="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {{ doc.description }}
            </div>
          }

          <!-- Hash integrity -->
          @if (doc.hashSha256) {
            <div class="p-3 rounded-xl bg-slate-900 text-slate-200 text-[11px] font-mono space-y-1">
              <span class="text-emerald-400 font-bold block text-[10px] uppercase font-sans">Código de Integridade SHA-256</span>
              <p class="break-all select-all">{{ doc.hashSha256 }}</p>
            </div>
          }

          <div class="flex items-center justify-between pt-4 border-t border-slate-100">
            <span class="text-[11px] text-slate-400">Associação Comunitária de Padre Lúcio</span>
            <div class="flex items-center gap-2">
              <button 
                (click)="closePreview()" 
                class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Fechar
              </button>
              <button 
                (click)="downloadDocSimulated(doc)" 
                class="px-4 py-2 rounded-xl bg-[#079F50] hover:bg-[#057d3e] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <mat-icon class="text-sm">download</mat-icon>
                <span>Baixar Documento</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class TransparencyComponent {
  readonly dataService = inject(DataService);
  private readonly notification = inject(NotificationService);

  readonly activeTab = signal<TransparencyTab>('documentos');
  readonly searchTerm = signal<string>('');
  readonly selectedYear = signal<string>('Todos');
  readonly docCategoryFilter = signal<string>('Todos');
  readonly finTypeFilter = signal<string>('Todos');
  readonly previewDoc = signal<TransparencyDocument | null>(null);

  readonly documentCategories = [
    'Institucional',
    'Governança & Atas',
    'Certidões & Regularidade',
    'Demonstrações Contábeis & Balanços',
    'Relatórios de Gestão & Execução',
    'Pareceres & Auditorias'
  ];

  readonly filteredDocuments = computed(() => {
    let list = this.dataService.documents();
    const term = this.searchTerm().trim().toLowerCase();
    const year = this.selectedYear();
    const cat = this.docCategoryFilter();

    if (cat !== 'Todos') {
      list = list.filter(d => d.category === cat);
    }
    if (year !== 'Todos') {
      list = list.filter(d => d.year.toString() === year);
    }
    if (term) {
      list = list.filter(d => 
        d.title.toLowerCase().includes(term) ||
        (d.description && d.description.toLowerCase().includes(term))
      );
    }

    return list;
  });

  readonly filteredInstruments = computed(() => {
    let list = this.dataService.instruments();
    const term = this.searchTerm().trim().toLowerCase();
    const year = this.selectedYear();

    if (year !== 'Todos') {
      list = list.filter(i => i.startDate.includes(year) || i.endDate.includes(year));
    }
    if (term) {
      list = list.filter(i => 
        i.number.toLowerCase().includes(term) ||
        i.object.toLowerCase().includes(term) ||
        i.grantingBody.toLowerCase().includes(term)
      );
    }

    return list;
  });

  readonly filteredFinancialRecords = computed(() => {
    let list = this.dataService.financialRecords();
    const term = this.searchTerm().trim().toLowerCase();
    const year = this.selectedYear();
    const type = this.finTypeFilter();

    if (type !== 'Todos') {
      list = list.filter(r => r.type === type);
    }
    if (year !== 'Todos') {
      list = list.filter(r => r.date.includes(year));
    }
    if (term) {
      list = list.filter(r => 
        r.description.toLowerCase().includes(term) ||
        r.vendorOrFunder.toLowerCase().includes(term) ||
        (r.instrumentNumber && r.instrumentNumber.toLowerCase().includes(term)) ||
        r.category.toLowerCase().includes(term)
      );
    }

    return list;
  });

  readonly filteredFinancialTotal = computed(() => {
    return this.filteredFinancialRecords().reduce((acc, curr) => acc + curr.amount, 0);
  });

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onYearChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedYear.set(select.value);
  }

  previewDocument(doc: TransparencyDocument) {
    this.previewDoc.set(doc);
  }

  closePreview() {
    this.previewDoc.set(null);
  }

  downloadDocSimulated(doc: TransparencyDocument) {
    this.notification.show(`Download iniciado: ${doc.title} (${doc.fileType})`, 'success');
  }

  downloadRelatedFile(file: { title: string; type: string }) {
    this.notification.show(`Download iniciado: ${file.title}`, 'success');
  }

  simulateDownload(fileName: string) {
    this.notification.show(`Download iniciado: ${fileName}`, 'success');
  }

  exportCurrentView() {
    // Generate CSV string based on active tab
    let csvContent = 'data:text/csv;charset=utf-8,';
    const tab = this.activeTab();

    if (tab === 'financeiro') {
      csvContent += 'Data;Tipo;Categoria;Descricao;Fornecedor;Instrumento;NF_Recibo;Valor;Status\r\n';
      this.filteredFinancialRecords().forEach(r => {
        csvContent += `"${r.date}";"${r.type}";"${r.category}";"${r.description}";"${r.vendorOrFunder}";"${r.instrumentNumber || ''}";"${r.invoiceOrReceiptNumber || ''}";"${r.amount}";"${r.status}"\r\n`;
      });
    } else {
      csvContent += 'Titulo;Categoria;Ano;Upload;Tamanho;Status\r\n';
      this.filteredDocuments().forEach(d => {
        csvContent += `"${d.title}";"${d.category}";"${d.year}";"${d.uploadDate}";"${d.fileSize}";"${d.status}"\r\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `transparencia_instituto_raizes_${tab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.notification.show('Arquivo CSV gerado e exportado com sucesso!', 'success');
  }
}
