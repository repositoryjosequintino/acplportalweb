import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { Project, ProjectCategory } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Header -->
    <section class="bg-white border-b border-slate-100 py-12 lg:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#079F50] text-xs font-semibold">
          <span>PORTFÓLIO DE IMPACTO SOCIAL</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Projetos & Ações Comunitárias
        </h1>
        <p class="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Iniciativas que transformam a realidade de Padre Lúcio nas áreas de educação, agroecologia sustentável, memória cultural e cidadania.
        </p>
      </div>
    </section>

    <!-- Main Content & Filters -->
    <main class="py-12 bg-[#fafbfc] min-h-[70vh]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <!-- Filter Bar (Apple-style Segmented Buttons & Search) -->
        <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <!-- Category buttons -->
          <div class="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl">
            <button 
              (click)="selectedCategory.set('Todos')"
              class="px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer"
              [class.bg-white]="selectedCategory() === 'Todos'"
              [class.text-slate-900]="selectedCategory() === 'Todos'"
              [class.shadow-2xs]="selectedCategory() === 'Todos'"
              [class.text-slate-600]="selectedCategory() !== 'Todos'"
              [class.hover:text-slate-900]="selectedCategory() !== 'Todos'"
            >
              Todos ({{ dataService.projects().length }})
            </button>
            @for (cat of categories; track cat) {
              <button 
                (click)="selectedCategory.set(cat)"
                class="px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap"
                [class.bg-white]="selectedCategory() === cat"
                [class.text-slate-900]="selectedCategory() === cat"
                [class.shadow-2xs]="selectedCategory() === cat"
                [class.text-slate-600]="selectedCategory() !== cat"
                [class.hover:text-slate-900]="selectedCategory() !== cat"
              >
                {{ cat }}
              </button>
            }
          </div>

          <!-- Search Input -->
          <div class="relative w-full md:w-72">
            <mat-icon class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</mat-icon>
            <input 
              type="text" 
              placeholder="Pesquisar por título ou palavra-chave..." 
              [value]="searchTerm()"
              (input)="onSearchInput($event)"
              class="w-full pl-10 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:border-[#079F50] transition-all"
            />
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (project of filteredProjects(); track project.id) {
            <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
              
              <div>
                <!-- Image Box -->
                <div class="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <img 
                    [src]="project.imageUrl" 
                    [alt]="project.title" 
                    class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerpolicy="no-referrer"
                  />
                  <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-800 shadow-2xs">
                    {{ project.category }}
                  </div>
                  <div class="absolute top-3 right-3 bg-emerald-500/90 text-white px-2 py-0.5 rounded-md text-[10px] font-semibold">
                    {{ project.status }}
                  </div>
                </div>

                <!-- Info Body -->
                <div class="p-6 space-y-4">
                  <div class="text-[11px] font-medium text-slate-400 flex items-center gap-2">
                    <mat-icon class="text-xs !text-[13px]">date_range</mat-icon>
                    <span>Vigência: {{ project.period }}</span>
                    <span>·</span>
                    <span>{{ project.beneficiariesCount }} beneficiários</span>
                  </div>

                  <h2 class="text-lg font-bold text-slate-900 group-hover:text-[#079F50] transition-colors leading-snug">
                    {{ project.title }}
                  </h2>

                  <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {{ project.shortDescription }}
                  </p>

                  <!-- Metrics Chips -->
                  <div class="grid grid-cols-2 gap-2 pt-1">
                    @for (m of project.metrics.slice(0, 2); track m.label) {
                      <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span class="text-xs font-bold text-slate-800 block tabular-nums">{{ m.value }}</span>
                        <span class="text-[10px] text-slate-500 leading-tight block">{{ m.label }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Footer with CTA -->
              <div class="p-6 pt-0">
                <button 
                  (click)="openProjectModal(project)"
                  class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#079F50] hover:text-white text-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <mat-icon class="text-sm">visibility</mat-icon>
                  <span>Ver Dossiê do Projeto</span>
                </button>
              </div>

            </div>
          } @empty {
            <div class="col-span-full py-16 text-center space-y-3 bg-white rounded-3xl border border-slate-200">
              <mat-icon class="text-slate-300 text-4xl">search_off</mat-icon>
              <h3 class="text-base font-bold text-slate-800">Nenhum projeto encontrado</h3>
              <p class="text-xs text-slate-500">Tente ajustar o termo de pesquisa ou selecionar outra categoria.</p>
              <button 
                (click)="resetFilters()" 
                class="px-4 py-2 rounded-xl bg-[#079F50] text-white text-xs font-semibold"
              >
                Limpar Filtros
              </button>
            </div>
          }
        </div>

      </div>
    </main>

    <!-- Project Detail Modal -->
    @if (activeProject(); as proj) {
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
        role="dialog"
        aria-modal="true"
        tabindex="0"
        (keydown.escape)="closeModal()"
      >
        <button 
          type="button" 
          class="fixed inset-0 w-full h-full cursor-default bg-transparent border-0" 
          (click)="closeModal()" 
          aria-label="Fechar detalhes do projeto"
        ></button>
        <div 
          class="relative z-10 bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 text-slate-800"
        >
          <!-- Modal Header -->
          <div class="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2 text-xs font-semibold text-[#079F50]">
                <span>{{ proj.category }}</span>
                <span>·</span>
                <span class="text-slate-400">Vigência: {{ proj.period }}</span>
              </div>
              <h3 class="text-2xl font-extrabold text-slate-900 leading-snug">
                {{ proj.title }}
              </h3>
            </div>
            <button 
              (click)="closeModal()" 
              class="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <!-- Modal Image Cover -->
          <div class="rounded-2xl overflow-hidden aspect-16/9 bg-slate-100">
            <img 
              [src]="proj.imageUrl" 
              [alt]="proj.title" 
              class="w-full h-full object-cover"
              referrerpolicy="no-referrer"
            />
          </div>

          <!-- Description -->
          <div class="space-y-3">
            <h4 class="text-xs uppercase tracking-wider font-bold text-slate-900">Sobre o Projeto</h4>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {{ proj.fullDescription }}
            </p>
          </div>

          <!-- Objectives -->
          <div class="space-y-3">
            <h4 class="text-xs uppercase tracking-wider font-bold text-slate-900">Objetivos Específicos</h4>
            <ul class="space-y-2 text-xs text-slate-600">
              @for (obj of proj.objectives; track obj) {
                <li class="flex items-start gap-2">
                  <mat-icon class="text-[#079F50] text-sm shrink-0 mt-0.5">check_circle</mat-icon>
                  <span>{{ obj }}</span>
                </li>
              }
            </ul>
          </div>

          <!-- Results Achieved -->
          <div class="space-y-3">
            <h4 class="text-xs uppercase tracking-wider font-bold text-slate-900">Resultados & Indicadores de Impacto</h4>
            <ul class="space-y-2 text-xs text-slate-600">
              @for (res of proj.results; track res) {
                <li class="flex items-start gap-2">
                  <mat-icon class="text-[#32A5E8] text-sm shrink-0 mt-0.5">trending_up</mat-icon>
                  <span>{{ res }}</span>
                </li>
              }
            </ul>
          </div>

          <!-- Public & Partners -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span class="text-[11px] font-bold text-slate-500 uppercase">Público Atendido</span>
              <p class="text-xs text-slate-800 font-medium">{{ proj.targetPublic }} ({{ proj.beneficiariesCount }} pessoas)</p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span class="text-[11px] font-bold text-slate-500 uppercase">Parceiros Envolvidos</span>
              <p class="text-xs text-slate-800 font-medium">{{ proj.partners.join(', ') }}</p>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-[11px] text-slate-400">
              Associação Comunitária de Padre Lúcio · MROSC
            </span>
            <button 
              (click)="closeModal()" 
              class="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class ProjectsComponent {
  readonly dataService = inject(DataService);
  
  readonly categories: ProjectCategory[] = [
    'Educação',
    'Agroecologia & Meio Ambiente',
    'Cultura & Memória',
    'Inclusão Social & Esporte'
  ];

  readonly selectedCategory = signal<string>('Todos');
  readonly searchTerm = signal<string>('');
  readonly activeProject = signal<Project | null>(null);

  readonly filteredProjects = computed(() => {
    let list = this.dataService.projects();
    const cat = this.selectedCategory();
    const term = this.searchTerm().trim().toLowerCase();

    if (cat !== 'Todos') {
      list = list.filter(p => p.category === cat);
    }

    if (term) {
      list = list.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term) ||
        p.targetPublic.toLowerCase().includes(term)
      );
    }

    return list;
  });

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  resetFilters() {
    this.selectedCategory.set('Todos');
    this.searchTerm.set('');
  }

  openProjectModal(project: Project) {
    this.activeProject.set(project);
  }

  closeModal() {
    this.activeProject.set(null);
  }
}
