import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { NewsCategory, NewsItem } from '../../models/additional.model';

@Component({
  selector: 'app-news',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Header -->
    <section class="bg-white border-b border-slate-100 py-12 lg:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#079F50] text-xs font-semibold">
          <span>COMUNICAÇÃO INSTITUCIONAL</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Notícias & Comunicados
        </h1>
        <p class="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Acompanhe as ações, inaugurações, comunicados oficiais e eventos do Instituto Raízes da Comunidade em Padre Lúcio.
        </p>
      </div>
    </section>

    <!-- Main Content & Filter Bar -->
    <main class="py-12 bg-[#fafbfc] min-h-[70vh]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <!-- Filter Pills & Search -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl w-full sm:w-auto">
            <button 
              (click)="selectedCategory.set('Todos')"
              class="px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              [class.bg-white]="selectedCategory() === 'Todos'"
              [class.text-slate-900]="selectedCategory() === 'Todos'"
              [class.shadow-2xs]="selectedCategory() === 'Todos'"
              [class.text-slate-600]="selectedCategory() !== 'Todos'"
            >
              Todos ({{ dataService.news().length }})
            </button>
            @for (cat of categories; track cat) {
              <button 
                (click)="selectedCategory.set(cat)"
                class="px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap"
                [class.bg-white]="selectedCategory() === cat"
                [class.text-slate-900]="selectedCategory() === cat"
                [class.shadow-2xs]="selectedCategory() === cat"
                [class.text-slate-600]="selectedCategory() !== cat"
              >
                {{ cat }}
              </button>
            }
          </div>

          <div class="relative w-full sm:w-64">
            <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</mat-icon>
            <input 
              type="text" 
              placeholder="Buscar publicações..." 
              [value]="searchTerm()"
              (input)="onSearchInput($event)"
              class="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20"
            />
          </div>
        </div>

        <!-- Featured News / Lead Story (Apple Style) -->
        @if (leadArticle(); as lead) {
          <article 
            (click)="openArticle(lead)"
            (keydown.enter)="openArticle(lead)"
            tabindex="0"
            role="button"
            class="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12 focus:outline-none focus:ring-2 focus:ring-[#079F50]"
          >
            <div class="lg:col-span-7 aspect-16/10 lg:aspect-auto overflow-hidden bg-slate-100 relative">
              <img 
                [src]="lead.imageUrl" 
                [alt]="lead.title" 
                class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerpolicy="no-referrer"
              />
              <span class="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-slate-800 shadow-2xs">
                Destaque · {{ lead.category }}
              </span>
            </div>

            <div class="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div class="space-y-3">
                <div class="text-xs text-slate-400 font-mono">
                  {{ lead.publishedAt }} · {{ lead.author }}
                </div>
                <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#079F50] transition-colors leading-tight">
                  {{ lead.title }}
                </h2>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {{ lead.summary }}
                </p>
              </div>

              <div class="flex items-center gap-2 text-xs font-semibold text-[#079F50] group-hover:translate-x-1 transition-transform">
                <span>Ler comunicado completo</span>
                <mat-icon class="text-sm">arrow_forward</mat-icon>
              </div>
            </div>
          </article>
        }

        <!-- News Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (item of filteredNews(); track item.id) {
            <article 
              (click)="openArticle(item)"
              (keydown.enter)="openArticle(item)"
              tabindex="0"
              role="button"
              class="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#079F50]"
            >
              <div>
                <div class="aspect-16/10 overflow-hidden bg-slate-100 relative">
                  <img 
                    [src]="item.imageUrl" 
                    [alt]="item.title" 
                    class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerpolicy="no-referrer"
                  />
                  <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[10px] font-bold text-slate-800">
                    {{ item.category }}
                  </span>
                </div>

                <div class="p-6 space-y-2">
                  <span class="text-[11px] font-mono text-slate-400 block">{{ item.publishedAt }}</span>
                  <h3 class="text-base font-bold text-slate-900 group-hover:text-[#079F50] transition-colors leading-snug">
                    {{ item.title }}
                  </h3>
                  <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {{ item.summary }}
                  </p>
                </div>
              </div>

              <div class="p-6 pt-0 flex items-center justify-between text-xs text-[#079F50] font-semibold">
                <span>Ver publicação</span>
                <mat-icon class="text-sm">arrow_forward</mat-icon>
              </div>
            </article>
          }
        </div>

      </div>
    </main>

    <!-- Article Reading Modal -->
    @if (activeArticle(); as art) {
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
        role="dialog"
        aria-modal="true"
        tabindex="0"
        (keydown.escape)="closeArticle()"
      >
        <button 
          type="button" 
          class="fixed inset-0 w-full h-full cursor-default bg-transparent border-0" 
          (click)="closeArticle()" 
          aria-label="Fechar notícia"
        ></button>
        <div 
          class="relative z-10 bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 text-slate-800"
        >
          <div class="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div class="space-y-1">
              <span class="text-xs font-bold text-[#079F50] uppercase">{{ art.category }}</span>
              <h3 class="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">{{ art.title }}</h3>
              <p class="text-xs text-slate-400 font-mono">{{ art.publishedAt }} · Por {{ art.author }}</p>
            </div>
            <button (click)="closeArticle()" class="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <div class="rounded-2xl overflow-hidden aspect-16/9 bg-slate-100">
            <img [src]="art.imageUrl" [alt]="art.title" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
          </div>

          <div class="prose prose-slate text-xs sm:text-sm leading-relaxed text-slate-700 space-y-4">
            <p class="font-semibold text-slate-900">{{ art.summary }}</p>
            <p>{{ art.content }}</p>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 pt-2">
            @for (tag of art.tags; track tag) {
              <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">#{{ tag }}</span>
            }
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-slate-100">
            <span class="text-[11px] text-slate-400">Associação Comunitária de Padre Lúcio</span>
            <button 
              (click)="closeArticle()" 
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
export class NewsComponent {
  readonly dataService = inject(DataService);

  readonly categories: NewsCategory[] = ['Notícia', 'Comunicado Oficial', 'Evento', 'Campanha'];
  readonly selectedCategory = signal<string>('Todos');
  readonly searchTerm = signal<string>('');
  readonly activeArticle = signal<NewsItem | null>(null);

  readonly filteredNews = computed(() => {
    let list = this.dataService.news();
    const cat = this.selectedCategory();
    const term = this.searchTerm().trim().toLowerCase();

    if (cat !== 'Todos') {
      list = list.filter(n => n.category === cat);
    }
    if (term) {
      list = list.filter(n => 
        n.title.toLowerCase().includes(term) ||
        n.summary.toLowerCase().includes(term) ||
        n.content.toLowerCase().includes(term)
      );
    }
    return list;
  });

  readonly leadArticle = computed(() => {
    return this.filteredNews().length > 0 ? this.filteredNews()[0] : null;
  });

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  openArticle(item: NewsItem) {
    this.activeArticle.set(item);
  }

  closeArticle() {
    this.activeArticle.set(null);
  }
}
