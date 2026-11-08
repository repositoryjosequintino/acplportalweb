import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <!-- Apple-style Hero Section -->
    <section class="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header Text Block -->
        <div class="text-center max-w-3xl mx-auto mb-10 lg:mb-14 space-y-4">
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/80 text-slate-800 text-xs font-semibold tracking-wide shadow-2xs">
            <img src="/assets/logo.png" alt="Emblema Oficial" class="w-6 h-6 rounded-full object-contain" />
            <span>ASSOCIAÇÃO COMUNITÁRIA DE PADRE LÚCIO</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] text-balance">
            Fortalecendo raízes, cultivando futuro e transformando vidas.
          </h1>

          <p class="text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-balance">
            O <strong>Instituto Raízes da Comunidade</strong> promove educação, agroecologia, cultura popular e cidadania em Padre Lúcio, com governança ética e transparência pública integral.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              routerLink="/projetos" 
              class="px-6 py-3.5 rounded-2xl bg-[#079F50] hover:bg-[#057d3e] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer active:scale-95"
            >
              <span>Conhecer Nossos Projetos</span>
              <mat-icon class="text-sm transition-transform group-hover:translate-x-1">arrow_forward</mat-icon>
            </a>

            <a 
              routerLink="/transparencia" 
              class="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <mat-icon class="text-[#32A5E8] text-base">policy</mat-icon>
              <span>Portal da Transparência</span>
            </a>

            <a 
              routerLink="/doacoes" 
              class="px-6 py-3.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-[#1b8dcd] font-semibold text-sm border border-sky-100 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <mat-icon class="text-base">favorite</mat-icon>
              <span>Apoiar via PIX</span>
            </a>
          </div>
        </div>

        <!-- Hero Cinematic Photographic Showcase (Apple Style) -->
        <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 bg-slate-900 aspect-16/9 max-h-[580px] w-full">
          <img 
            src="/src/assets/images/hero_community_roots_1794165964918.jpg" 
            alt="Comunidade de Padre Lúcio reunida em oficina comunitária do Instituto Raízes da Comunidade" 
            class="w-full h-full object-cover object-center"
            referrerpolicy="no-referrer"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6 sm:p-10">
            <div class="text-white max-w-2xl space-y-2">
              <span class="text-xs uppercase tracking-widest font-bold text-emerald-400">Padre Lúcio / Goiás</span>
              <h2 class="text-xl sm:text-2xl font-bold leading-tight">
                Um espaço vivo de acolhimento, agroecologia e oportunidades comunitárias.
              </h2>
              <p class="text-xs sm:text-sm text-slate-200/90 line-clamp-2">
                Mais de 480 famílias conectadas a iniciativas que valorizam a identidade local, protegem o meio ambiente e abrem portas para as próximas gerações.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Social Indicators Strip (Apple Style Clean Metrics) -->
    <section class="py-12 bg-[#fafbfc] border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/60 gap-4">
          <div>
            <h3 class="text-lg font-bold text-slate-900">Impacto Comunitário Mensurável</h3>
            <p class="text-xs text-slate-500">Indicadores sociais auditáveis e atualizados pela coordenação institucional.</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400">Dados demonstrativos oficiais</span>
            <a routerLink="/admin" class="text-xs text-[#079F50] hover:underline font-semibold flex items-center gap-1">
              <mat-icon class="text-xs !text-[14px]">edit</mat-icon>
              <span>Editar no Painel</span>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          @for (ind of dataService.indicators(); track ind.id) {
            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-sm transition-all space-y-2">
              <div class="flex items-center justify-between text-slate-400">
                <mat-icon class="text-[#079F50]">{{ ind.icon }}</mat-icon>
                <span class="text-[11px] font-mono text-slate-400">{{ ind.lastUpdated }}</span>
              </div>
              <div class="flex items-baseline gap-1">
                <span class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                  {{ ind.value }}
                </span>
                <span class="text-lg font-bold text-[#079F50]">{{ ind.unit }}</span>
              </div>
              <h4 class="text-sm font-semibold text-slate-800">{{ ind.label }}</h4>
              <p class="text-xs text-slate-500 leading-relaxed">{{ ind.description }}</p>
            </div>
          }
        </div>

      </div>
    </section>

    <!-- Presentation & Institutional Identity -->
    <section class="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div class="lg:col-span-6 space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#1b8dcd] text-xs font-semibold">
              <mat-icon class="text-xs !text-[14px]">info</mat-icon>
              <span>Apresentação Institucional</span>
            </div>

            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Uma trajetória construída pelo esforço coletivo da nossa comunidade.
            </h2>

            <p class="text-base text-slate-600 leading-relaxed">
              A <strong>Associação Comunitária de Padre Lúcio</strong>, por meio do <strong>Instituto Raízes da Comunidade</strong>, atua como polo de articulação e defesa de direitos dos moradores do povoado e áreas rurais vizinhas.
            </p>

            <p class="text-sm text-slate-600 leading-relaxed">
              Nosso trabalho é alicerçado na solidariedade, na valorização dos saberes populares e na criação de pontes entre o poder público, parceiros privados e a comunidade para viabilizar projetos reais nas áreas de educação, meio ambiente, agroecologia e cultura.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div class="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <mat-icon class="text-[#079F50] text-base">verified</mat-icon>
                  <span>Governança Democrática</span>
                </div>
                <p class="text-xs text-slate-500">Diretoria e Conselho Fiscal eleitos em Assembleia Geral.</p>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div class="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <mat-icon class="text-[#32A5E8] text-base">balance</mat-icon>
                  <span>Transparência MROSC</span>
                </div>
                <p class="text-xs text-slate-500">Conformidade integral com as exigências da Lei 13.019/2014.</p>
              </div>
            </div>

            <div class="pt-4 flex items-center gap-4">
              <a 
                routerLink="/quem-somos" 
                class="inline-flex items-center gap-2 text-sm font-semibold text-[#079F50] hover:text-[#057d3e] group"
              >
                <span>Conheça nossa história completa e diretoria</span>
                <mat-icon class="text-base transition-transform group-hover:translate-x-1">arrow_forward</mat-icon>
              </a>
            </div>
          </div>

          <div class="lg:col-span-6">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-4">
                <div class="rounded-2xl overflow-hidden shadow-md aspect-4/3 bg-slate-100">
                  <img 
                    src="/src/assets/images/project_education_kids_1794165964654.jpg" 
                    alt="Oficina pedagógica infantil" 
                    class="w-full h-full object-cover"
                    referrerpolicy="no-referrer"
                  />
                </div>
                <div class="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 space-y-1">
                  <span class="text-[11px] font-bold text-[#079F50] uppercase tracking-wide">Educação Infantojuvenil</span>
                  <p class="text-xs text-slate-700 font-medium">Reforço escolar e incentivo à leitura para 120 estudantes.</p>
                </div>
              </div>

              <div class="space-y-4 pt-8">
                <div class="p-4 rounded-2xl bg-sky-50/80 border border-sky-100 space-y-1">
                  <span class="text-[11px] font-bold text-[#1b8dcd] uppercase tracking-wide">Agroecologia Sustentável</span>
                  <p class="text-xs text-slate-700 font-medium">Horta coletiva e viveiro com mais de 1.250 mudas cultivadas.</p>
                </div>
                <div class="rounded-2xl overflow-hidden shadow-md aspect-4/3 bg-slate-100">
                  <img 
                    src="/src/assets/images/project_agroecology_garden_1794165966364.jpg" 
                    alt="Horta agroecológica comunitária" 
                    class="w-full h-full object-cover"
                    referrerpolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Featured Projects Grid -->
    <section class="py-16 lg:py-24 bg-[#fafbfc] border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div class="space-y-2">
            <span class="text-xs uppercase tracking-widest font-bold text-[#079F50]">Nossas Frentes de Atuação</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Projetos e Ações Comunitárias
            </h2>
            <p class="text-sm text-slate-600 max-w-xl">
              Iniciativas estruturadas que geram resultados sociais mensuráveis, capacitação e cidadania para as famílias de Padre Lúcio.
            </p>
          </div>

          <a 
            routerLink="/projetos" 
            class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold shadow-2xs transition-all shrink-0"
          >
            <span>Ver Todos os Projetos</span>
            <mat-icon class="text-sm">arrow_forward</mat-icon>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (project of dataService.projects().slice(0, 3); track project.id) {
            <div class="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
              <!-- Image Cover -->
              <div class="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img 
                  [src]="project.imageUrl" 
                  [alt]="project.title" 
                  class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerpolicy="no-referrer"
                />
                <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-800 shadow-xs">
                  {{ project.category }}
                </div>
                <div class="absolute top-3 right-3 bg-emerald-500/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                  {{ project.status }}
                </div>
              </div>

              <!-- Content Body -->
              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-2">
                  <div class="text-[11px] font-medium text-slate-400 flex items-center gap-2">
                    <mat-icon class="text-xs !text-[13px]">calendar_today</mat-icon>
                    <span>Vigência: {{ project.period }}</span>
                    <span>·</span>
                    <span>{{ project.beneficiariesCount }} beneficiários</span>
                  </div>

                  <h3 class="text-base font-bold text-slate-900 group-hover:text-[#079F50] transition-colors leading-snug">
                    {{ project.title }}
                  </h3>

                  <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {{ project.shortDescription }}
                  </p>
                </div>

                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div class="text-xs text-slate-500">
                    <strong class="text-slate-800 font-semibold">{{ project.metrics[0].value }}</strong>
                    <span class="text-[11px] block">{{ project.metrics[0].label }}</span>
                  </div>

                  <a 
                    routerLink="/projetos" 
                    class="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-[#079F50] transition-colors"
                    title="Ver detalhes do projeto"
                  >
                    <mat-icon class="text-sm">arrow_forward</mat-icon>
                  </a>
                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </section>

    <!-- Transparency & MROSC Callout Strip -->
    <section class="py-14 bg-slate-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div class="lg:col-span-8 space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <mat-icon class="text-xs !text-[14px]">shield</mat-icon>
              <span>Transparência Pública e Controle Social</span>
            </div>

            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Prestar contas é honrar a confiança da nossa comunidade.
            </h2>

            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Acesse convênios, termos de fomento, demonstrativos de receitas e despesas, relatórios de cumprimento do objeto e balanços contábeis. Todos os documentos com links de consulta e filtros por ano e órgão concedente.
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <span class="flex items-center gap-1.5">
                <mat-icon class="text-emerald-400 text-sm">check_circle</mat-icon>
                Lei Federal 13.019/2014
              </span>
              <span class="flex items-center gap-1.5">
                <mat-icon class="text-emerald-400 text-sm">check_circle</mat-icon>
                Decreto 8.726/2016
              </span>
              <span class="flex items-center gap-1.5">
                <mat-icon class="text-emerald-400 text-sm">check_circle</mat-icon>
                Lei de Acesso à Informação
              </span>
            </div>
          </div>

          <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <a 
              routerLink="/transparencia" 
              class="px-6 py-3.5 rounded-2xl bg-[#079F50] hover:bg-[#057d3e] text-white font-semibold text-center text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <mat-icon class="text-base">search</mat-icon>
              <span>Acessar Portal da Transparência</span>
            </a>

            <a 
              routerLink="/transparencia" 
              class="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-center text-sm border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <mat-icon class="text-base text-[#32A5E8]">description</mat-icon>
              <span>Estatuto & Atas de Eleição</span>
            </a>
          </div>

        </div>
      </div>
    </section>

    <!-- Recent News Section -->
    <section class="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div class="space-y-1">
            <span class="text-xs uppercase tracking-widest font-bold text-[#079F50]">Comunicação e Transparência</span>
            <h2 class="text-3xl font-extrabold tracking-tight text-slate-900">
              Notícias e Comunicados Oficiais
            </h2>
          </div>

          <a 
            routerLink="/noticias" 
            class="text-xs font-semibold text-[#079F50] hover:underline flex items-center gap-1"
          >
            <span>Ver todas as publicações</span>
            <mat-icon class="text-sm">arrow_forward</mat-icon>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (item of dataService.news().slice(0, 3); track item.id) {
            <article class="group flex flex-col space-y-3">
              <div class="rounded-2xl overflow-hidden aspect-16/10 bg-slate-100 relative">
                <img 
                  [src]="item.imageUrl" 
                  [alt]="item.title" 
                  class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  referrerpolicy="no-referrer"
                />
                <span class="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 text-slate-800 text-[10px] font-bold">
                  {{ item.category }}
                </span>
              </div>

              <div class="text-[11px] text-slate-400 font-medium">
                {{ item.publishedAt }} · {{ item.author }}
              </div>

              <h3 class="text-base font-bold text-slate-900 group-hover:text-[#079F50] transition-colors leading-snug">
                <a routerLink="/noticias">{{ item.title }}</a>
              </h3>

              <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {{ item.summary }}
              </p>
            </article>
          }
        </div>

      </div>
    </section>

    <!-- Quick PIX & Volunteering Callouts -->
    <section class="py-16 bg-[#fafbfc] border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <!-- PIX Card -->
          <div class="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-[#079F50] flex items-center justify-center">
                <mat-icon>favorite</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-slate-900">Apoie com qualquer valor via PIX</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Sua contribuição direta apoia a compra de lanches para as crianças, ferramentas para a horta comunitária e materiais de reforço escolar em Padre Lúcio.
              </p>
              
              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span class="text-[10px] text-slate-400 uppercase font-bold block">Chave PIX Oficial (E-mail):</span>
                  <code class="font-mono font-bold text-slate-800">{{ dataService.institution().donationInfo.pixKey }}</code>
                </div>
                <button 
                  (click)="copyPix()" 
                  class="px-3 py-1.5 rounded-lg bg-[#079F50] hover:bg-[#057d3e] text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <mat-icon class="text-xs !text-[14px]">content_copy</mat-icon>
                  <span>Copiar</span>
                </button>
              </div>
            </div>

            <div class="pt-2">
              <a routerLink="/doacoes" class="text-xs font-semibold text-[#079F50] hover:underline flex items-center gap-1">
                <span>Ver QR Code, dados bancários e doações materiais</span>
                <mat-icon class="text-sm">arrow_forward</mat-icon>
              </a>
            </div>
          </div>

          <!-- Volunteer Card -->
          <div class="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-2xl bg-sky-50 text-[#32A5E8] flex items-center justify-center">
                <mat-icon>volunteer_activism</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-slate-900">Seja Voluntário do Programa Raízes</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Doe seu tempo e seu talento. Temos vagas em reforço escolar, oficinas musicais, cultivo da horta coletiva, comunicação comunitária e organização de eventos.
              </p>
              
              <div class="flex flex-wrap gap-2 pt-1">
                <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">Reforço Escolar</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">Horta Comunitária</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">Música & Violão</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">Comunicação</span>
              </div>
            </div>

            <div class="pt-2">
              <a 
                routerLink="/voluntariado" 
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Inscrever-se como Voluntário</span>
                <mat-icon class="text-sm">arrow_forward</mat-icon>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Institutional Partners Grid -->
    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span class="text-xs uppercase tracking-widest font-bold text-slate-400">
          Cooperação Institucional & Redes Parceiras
        </span>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          @for (partner of dataService.partners(); track partner.id) {
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center space-y-1">
              <span class="text-xs font-bold text-slate-800">{{ partner.name }}</span>
              <span class="text-[10px] text-slate-500">{{ partner.category }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {
  readonly dataService = inject(DataService);
  private readonly notification = inject(NotificationService);

  copyPix() {
    const key = this.dataService.institution().donationInfo.pixKey;
    navigator.clipboard.writeText(key).then(() => {
      this.notification.show('Chave PIX copiada para a área de transferência!', 'success');
    }).catch(() => {
      this.notification.show(`Chave PIX: ${key}`, 'info');
    });
  }
}
