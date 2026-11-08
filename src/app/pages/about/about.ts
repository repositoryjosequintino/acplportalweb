import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <!-- Hero Header with Apple Ambient Glow -->
    <section class="bg-white border-b border-slate-100 py-16 lg:py-24 relative overflow-hidden">
      <!-- Ambient Background Glow -->
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-emerald-100/40 via-sky-100/20 to-transparent blur-3xl pointer-events-none -z-10"></div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-500/20 text-[#079F50] text-xs font-semibold shadow-xs">
          <span class="w-1.5 h-1.5 rounded-full bg-[#079F50] animate-pulse"></span>
          <span>INSTITUCIONAL & HISTÓRIA</span>
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
          Quem Somos
        </h1>
        <p class="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          A união comunitária que germinou sonhos e hoje cultiva cidadania, educação e dignidade em Padre Lúcio.
        </p>
      </div>
    </section>

    <!-- Nossa História & Origem -->
    <section class="py-16 sm:py-20 bg-[#fafbfc] border-b border-slate-200/80">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div class="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 space-y-6">
          <div class="space-y-2">
            <span class="text-xs uppercase tracking-widest font-bold text-[#079F50]">Nossa Trajetória</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              História da Associação Comunitária de Padre Lúcio
            </h2>
          </div>

          <div class="prose prose-slate text-sm sm:text-base leading-relaxed text-slate-600 space-y-4">
            <p>
              A <strong>Associação Comunitária de Padre Lúcio</strong> nasceu no coração do povoado de Padre Lúcio, motivada pela necessidade sentida pelos próprios moradores de se organizarem coletivamente em defesa do bem-estar social, da preservação das tradições locais e da melhoria das condições de vida das famílias residentes no núcleo urbano e nas propriedades rurais adjacentes.
            </p>
            <p>
              Com a ampliação das ações nas áreas pedagógica, esportiva e ecológica, a organização consolidou o nome fantasia <strong>INSTITUTO RAÍZES DA COMUNIDADE</strong>, expressando o compromisso de valorizar a ancestralidade e as raízes da terra, ao mesmo tempo em que oferece oportunidades modernas de crescimento para as crianças e jovens.
            </p>
            <p>
              Hoje, o Instituto é uma Organização da Sociedade Civil (OSC) sem fins lucrativos, legalmente constituída, regida pelas normas da <strong>Lei Federal nº 13.019/2014</strong>, com prestação de contas integral e governança compartilhada entre diretoria, conselho fiscal e a comunidade.
            </p>
          </div>

          <!-- Key Milestones with Apple Hover Lifts -->
          <div class="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:bg-white hover:border-[#079F50]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default">
              <span class="text-2xl sm:text-3xl font-extrabold text-[#079F50] block font-mono">2018</span>
              <span class="text-xs font-semibold text-slate-800">Fundação Comunitária</span>
              <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">Início dos mutirões e rodas de conversa populares.</p>
            </div>
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:bg-white hover:border-[#32A5E8]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default">
              <span class="text-2xl sm:text-3xl font-extrabold text-[#32A5E8] block font-mono">2021</span>
              <span class="text-xs font-semibold text-slate-800">Instituto Raízes</span>
              <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">Estruturação de projetos pedagógicos e horta.</p>
            </div>
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default">
              <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 block font-mono">2024-2026</span>
              <span class="text-xs font-semibold text-slate-800">MROSC & Parcerias</span>
              <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">Convênios públicos com transparência ativa total.</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Missão, Visão e Valores (Apple Minimalist Cards) -->
    <section class="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span class="text-xs uppercase tracking-widest font-bold text-[#079F50]">Princípios Institucionais</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Missão, Visão e Valores</h2>
          <p class="text-xs sm:text-sm text-slate-500">Diretrizes que orientam cada projeto, decisão e recurso administrado pela instituição.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Missão -->
          <div class="p-8 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-[#079F50]/40 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100/60 text-[#079F50] flex items-center justify-center shadow-xs">
              <mat-icon class="text-2xl">flag</mat-icon>
            </div>
            <h3 class="text-xl font-bold text-slate-900">Missão</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Promover o desenvolvimento integral da comunidade de Padre Lúcio por meio da educação cidadã, da agroecologia sustentável, do acolhimento das famílias e da valorização das tradições culturais, sempre guiados pela ética e integridade pública.
            </p>
          </div>

          <!-- Visão -->
          <div class="p-8 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-[#32A5E8]/40 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-sky-100/60 text-[#32A5E8] flex items-center justify-center shadow-xs">
              <mat-icon class="text-2xl">visibility</mat-icon>
            </div>
            <h3 class="text-xl font-bold text-slate-900">Visão</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ser referência regional de organização comunitária do terceiro setor, reconhecida pela excelência em projetos socioambientais, transparência irrestrita de gestão e impacto duradouro na vida de cada geração atendida.
            </p>
          </div>

          <!-- Valores -->
          <div class="p-8 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-slate-200/60 text-slate-800 flex items-center justify-center shadow-xs">
              <mat-icon class="text-2xl">balance</mat-icon>
            </div>
            <h3 class="text-xl font-bold text-slate-900">Valores</h3>
            <ul class="text-xs sm:text-sm text-slate-600 space-y-2.5 leading-relaxed">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#079F50] shrink-0"></span>
                <span><strong>Transparência ativa</strong> e controle social</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#32A5E8] shrink-0"></span>
                <span><strong>Solidariedade</strong> e acolhimento humano</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0"></span>
                <span><strong>Sustentabilidade</strong> ambiental e alimentar</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#079F50] shrink-0"></span>
                <span><strong>Gestão democrática</strong> e participativa</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>

    <!-- Objetivos Sociais -->
    <section class="py-16 bg-[#fafbfc] border-b border-slate-200/80">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="text-center space-y-2">
          <span class="text-xs uppercase tracking-widest font-bold text-[#079F50]">Finalidades Estatutárias</span>
          <h2 class="text-3xl font-extrabold text-slate-900">Objetivos Sociais</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-emerald-50 text-[#079F50] flex items-center justify-center font-bold text-xs">01</div>
              <h3 class="text-sm font-bold text-slate-900">Educação e Inclusão Digital</h3>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              Oferecer reforço escolar no contraturno, círculos de leitura, oficinas de informática e incentivo ao ingresso de jovens no ensino técnico e superior.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-sky-50 text-[#32A5E8] flex items-center justify-center font-bold text-xs">02</div>
              <h3 class="text-sm font-bold text-slate-900">Agroecologia e Soberania Alimentar</h3>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              Fomentar a produção de alimentos saudáveis sem agrotóxicos em hortas comunitárias, capacitar produtores em compostagem e proteger nascentes do Cerrado.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs">03</div>
              <h3 class="text-sm font-bold text-slate-900">Cultura, Esporte e Memória Local</h3>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              Preservar a história oral dos pioneiros de Padre Lúcio, incentivar a música popular, o artesanato e a prática esportiva saudável para a juventude.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-emerald-50 text-[#079F50] flex items-center justify-center font-bold text-xs">04</div>
              <h3 class="text-sm font-bold text-slate-900">Cidadania e Assistência Social</h3>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              Apoiar famílias em situação de vulnerabilidade, facilitar o acesso à documentação civil e atuar de forma articulada com a rede socioassistencial municipal.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Diretoria e Governança -->
    <section class="py-16 bg-white border-b border-slate-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div class="text-center space-y-2">
          <span class="text-xs uppercase tracking-widest font-bold text-[#079F50]">Governança e Integridade</span>
          <h2 class="text-3xl font-extrabold text-slate-900">Diretoria & Conselho Fiscal</h2>
          <p class="text-xs text-slate-500 max-w-xl mx-auto">
            Mandato atual (2024-2027) devidamente registrado em Ata de Assembleia Geral disponível no Portal da Transparência.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (member of dataService.boardMembers(); track member.id) {
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-sm transition-all space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-[#079F50] uppercase tracking-wider">{{ member.category }}</span>
                <span class="text-[10px] font-mono text-slate-400">{{ member.termPeriod }}</span>
              </div>
              
              <div>
                <h3 class="text-base font-bold text-slate-900">{{ member.name }}</h3>
                <p class="text-xs text-[#32A5E8] font-semibold">{{ member.role }}</p>
              </div>

              <p class="text-xs text-slate-600 leading-relaxed">
                {{ member.bio }}
              </p>
            </div>
          }
        </div>

      </div>
    </section>

    <!-- Estrutura Organizacional (Organograma) -->
    <section class="py-16 bg-[#fafbfc] border-b border-slate-200/80">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div class="text-center space-y-2">
          <span class="text-xs uppercase tracking-widest font-bold text-[#079F50]">Organograma Institucional</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Estrutura Organizacional</h2>
          <p class="text-xs text-slate-500">Distribuição funcional para prestação de contas, gestão de projetos e acompanhamento fiscal.</p>
        </div>

        <!-- Visual Hierarchy Chart -->
        <div class="space-y-4">
          <!-- Level 1: Assembleia Geral -->
          <div class="max-w-md mx-auto p-4 rounded-2xl bg-slate-900 text-white text-center shadow-md">
            <span class="text-[10px] uppercase tracking-widest font-bold text-emerald-400">Instância Máxima</span>
            <h3 class="text-sm font-bold">Assembleia Geral Comunitária</h3>
            <p class="text-[11px] text-slate-300">Moradores associados, voluntários e pioneiros de Padre Lúcio</p>
          </div>

          <div class="w-0.5 h-6 bg-slate-300 mx-auto"></div>

          <!-- Level 2: Diretoria e Conselho Fiscal -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="p-4 rounded-2xl bg-white border border-slate-200/80 text-center shadow-xs">
              <span class="text-[10px] uppercase tracking-wider font-bold text-[#079F50]">Gestão Operacional</span>
              <h4 class="text-sm font-bold text-slate-900">Diretoria Executiva</h4>
              <p class="text-[11px] text-slate-500">Presidência, Vice-Presidência e Diretoria Financeira</p>
            </div>

            <div class="p-4 rounded-2xl bg-white border border-slate-200/80 text-center shadow-xs">
              <span class="text-[10px] uppercase tracking-wider font-bold text-[#32A5E8]">Fiscalização Independente</span>
              <h4 class="text-sm font-bold text-slate-900">Conselho Fiscal (3 Titulares)</h4>
              <p class="text-[11px] text-slate-500">Exame de balancetes, extratos e cumprimento do objeto</p>
            </div>
          </div>

          <div class="w-0.5 h-6 bg-slate-300 mx-auto"></div>

          <!-- Level 3: Eixos Operacionais -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
              <span class="text-[11px] font-bold text-[#079F50] block">Eixo Educação</span>
              <span class="text-[10px] text-slate-600">Reforço e Leitura</span>
            </div>
            <div class="p-3 rounded-xl bg-sky-50 border border-sky-100 text-center">
              <span class="text-[11px] font-bold text-[#1b8dcd] block">Eixo Agroecologia</span>
              <span class="text-[10px] text-slate-600">Horta & Viveiro</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-100 text-center">
              <span class="text-[11px] font-bold text-slate-800 block">Eixo Cultura</span>
              <span class="text-[10px] text-slate-600">Música & Memória</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-100 text-center">
              <span class="text-[11px] font-bold text-slate-800 block">Eixo Transparência</span>
              <span class="text-[10px] text-slate-600">MROSC & Contabilidade</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Mensagem da Presidência (Editorial Apple Style) -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs space-y-6">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#079F50]">
            <mat-icon class="text-base">format_quote</mat-icon>
            <span>Palavra da Gestão</span>
          </div>

          <blockquote class="text-lg sm:text-2xl font-serif italic text-slate-900 leading-snug">
            "{{ dataService.institution().presidencyMessage.quote }}"
          </blockquote>

          <p class="text-sm text-slate-600 leading-relaxed pt-2">
            {{ dataService.institution().presidencyMessage.fullMessage }}
          </p>

          <div class="pt-6 border-t border-slate-200 flex items-center justify-between text-xs">
            <div>
              <p class="font-bold text-slate-900">{{ dataService.institution().presidentName }}</p>
              <p class="text-slate-500">{{ dataService.institution().presidencyMessage.presidentTitle }} · Associação Comunitária de Padre Lúcio</p>
            </div>
            <span class="text-slate-400 font-mono">{{ dataService.institution().presidencyMessage.date }}</span>
          </div>
        </div>

      </div>
    </section>
  `
})
export class AboutComponent {
  readonly dataService = inject(DataService);
}
