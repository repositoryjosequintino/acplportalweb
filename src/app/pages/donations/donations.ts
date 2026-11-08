import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-donations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Header -->
    <section class="bg-white border-b border-slate-100 py-12 lg:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#079F50] text-xs font-semibold">
          <mat-icon class="text-xs !text-[14px]">volunteer_activism</mat-icon>
          <span>SOLIDARIEDADE E APOIO INSTITUCIONAL</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Como Apoiar o Instituto
        </h1>
        <p class="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Cada contribuição é convertida diretamente em alimentação, livros, mudas agroecológicas e oportunidades para as famílias de Padre Lúcio.
        </p>
      </div>
    </section>

    <!-- Main Options -->
    <main class="py-12 bg-[#fafbfc]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Section 1: PIX Interativo (Apple Minimalist Box) -->
        <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-10 space-y-8">
          
          <div class="max-w-2xl space-y-2">
            <span class="text-xs uppercase tracking-widest font-bold text-[#079F50]">Doação Imediata</span>
            <h2 class="text-2xl font-bold text-slate-900">Contribua com Qualquer Valor via PIX</h2>
            <p class="text-xs sm:text-sm text-slate-600">
              Utilize o aplicativo do seu banco para ler o QR Code ou copie a chave oficial da Associação Comunitária de Padre Lúcio.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <!-- Left: QR Code Vector Display -->
            <div class="md:col-span-5 flex flex-col items-center p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <div class="p-3 rounded-2xl bg-white shadow-sm border border-slate-200/60 inline-block">
                <!-- Clean High Fidelity SVG QR Code representation -->
                <svg class="w-48 h-48" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- QR Finder Pattern Top Left -->
                  <rect x="10" y="10" width="50" height="50" rx="6" fill="#0F172A"/>
                  <rect x="20" y="20" width="30" height="30" rx="3" fill="#FFFFFF"/>
                  <rect x="26" y="26" width="18" height="18" rx="2" fill="#079F50"/>

                  <!-- QR Finder Pattern Top Right -->
                  <rect x="140" y="10" width="50" height="50" rx="6" fill="#0F172A"/>
                  <rect x="150" y="20" width="30" height="30" rx="3" fill="#FFFFFF"/>
                  <rect x="156" y="26" width="18" height="18" rx="2" fill="#079F50"/>

                  <!-- QR Finder Pattern Bottom Left -->
                  <rect x="10" y="140" width="50" height="50" rx="6" fill="#0F172A"/>
                  <rect x="20" y="150" width="30" height="30" rx="3" fill="#FFFFFF"/>
                  <rect x="26" y="156" width="18" height="18" rx="2" fill="#32A5E8"/>

                  <!-- Simulated stylized data dots -->
                  <rect x="70" y="20" width="12" height="12" rx="2" fill="#0F172A"/>
                  <rect x="90" y="20" width="12" height="12" rx="2" fill="#0F172A"/>
                  <rect x="110" y="20" width="12" height="12" rx="2" fill="#0F172A"/>
                  <rect x="70" y="40" width="12" height="12" rx="2" fill="#0F172A"/>
                  <rect x="100" y="40" width="22" height="12" rx="2" fill="#079F50"/>

                  <rect x="20" y="70" width="12" height="12" rx="2" fill="#0F172A"/>
                  <rect x="40" y="70" width="12" height="12" rx="2" fill="#0F172A"/>
                  <rect x="70" y="70" width="22" height="22" rx="3" fill="#0F172A"/>
                  <rect x="100" y="70" width="12" height="12" rx="2" fill="#32A5E8"/>
                  <rect x="120" y="70" width="22" height="12" rx="2" fill="#0F172A"/>
                  <rect x="160" y="70" width="12" height="12" rx="2" fill="#0F172A"/>

                  <rect x="70" y="100" width="12" height="12" rx="2" fill="#079F50"/>
                  <rect x="90" y="100" width="22" height="12" rx="2" fill="#0F172A"/>
                  <rect x="130" y="100" width="12" height="22" rx="2" fill="#0F172A"/>
                  <rect x="160" y="100" width="22" height="12" rx="2" fill="#079F50"/>

                  <rect x="20" y="100" width="22" height="12" rx="2" fill="#0F172A"/>
                  <rect x="20" y="120" width="12" height="12" rx="2" fill="#0F172A"/>
                  <rect x="70" y="130" width="12" height="12" rx="2" fill="#0F172A"/>
                  <rect x="90" y="130" width="12" height="12" rx="2" fill="#32A5E8"/>
                  <rect x="110" y="130" width="22" height="12" rx="2" fill="#0F172A"/>
                  <rect x="150" y="130" width="12" height="12" rx="2" fill="#0F172A"/>

                  <rect x="70" y="160" width="22" height="12" rx="2" fill="#0F172A"/>
                  <rect x="110" y="160" width="12" height="22" rx="2" fill="#0F172A"/>
                  <rect x="140" y="160" width="22" height="12" rx="2" fill="#079F50"/>
                  <rect x="170" y="160" width="12" height="12" rx="2" fill="#0F172A"/>
                  <rect x="140" y="180" width="12" height="10" rx="2" fill="#0F172A"/>
                  <rect x="170" y="180" width="12" height="10" rx="2" fill="#0F172A"/>
                </svg>
              </div>

              <div class="space-y-1">
                <span class="text-xs font-bold text-slate-800">Escaneie pelo aplicativo do seu banco</span>
                <span class="text-[11px] text-slate-500 block">PIX Direto · Sem intermediários</span>
              </div>
            </div>

            <!-- Right: Copy Paste Key & Bank Info -->
            <div class="md:col-span-7 space-y-6">
              
              <!-- Value Selector Buttons -->
              <div class="space-y-2">
                <span class="text-xs font-bold text-slate-700 block">Sugestões de Apoio:</span>
                <div class="grid grid-cols-4 gap-2">
                  <button 
                    (click)="selectedVal.set(20)" 
                    class="py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border"
                    [class.bg-[#079F50]]="selectedVal() === 20"
                    [class.text-white]="selectedVal() === 20"
                    [class.border-[#079F50]]="selectedVal() === 20"
                    [class.bg-slate-50]="selectedVal() !== 20"
                    [class.text-slate-700]="selectedVal() !== 20"
                    [class.border-slate-200]="selectedVal() !== 20"
                  >
                    R$ 20
                  </button>
                  <button 
                    (click)="selectedVal.set(50)" 
                    class="py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border"
                    [class.bg-[#079F50]]="selectedVal() === 50"
                    [class.text-white]="selectedVal() === 50"
                    [class.border-[#079F50]]="selectedVal() === 50"
                    [class.bg-slate-50]="selectedVal() !== 50"
                    [class.text-slate-700]="selectedVal() !== 50"
                    [class.border-slate-200]="selectedVal() !== 50"
                  >
                    R$ 50
                  </button>
                  <button 
                    (click)="selectedVal.set(100)" 
                    class="py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border"
                    [class.bg-[#079F50]]="selectedVal() === 100"
                    [class.text-white]="selectedVal() === 100"
                    [class.border-[#079F50]]="selectedVal() === 100"
                    [class.bg-slate-50]="selectedVal() !== 100"
                    [class.text-slate-700]="selectedVal() !== 100"
                    [class.border-slate-200]="selectedVal() !== 100"
                  >
                    R$ 100
                  </button>
                  <button 
                    (click)="selectedVal.set(250)" 
                    class="py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border"
                    [class.bg-[#079F50]]="selectedVal() === 250"
                    [class.text-white]="selectedVal() === 250"
                    [class.border-[#079F50]]="selectedVal() === 250"
                    [class.bg-slate-50]="selectedVal() !== 250"
                    [class.text-slate-700]="selectedVal() !== 250"
                    [class.border-slate-200]="selectedVal() !== 250"
                  >
                    R$ 250
                  </button>
                </div>
                <p class="text-[11px] text-slate-500">
                  @if (selectedVal() === 20) { R$ 20 custeia o kit de sementes e insumos para 1 canteiro na horta comunitária. }
                  @if (selectedVal() === 50) { R$ 50 garante lanche saudável por 1 semana para uma criança em reforço escolar. }
                  @if (selectedVal() === 100) { R$ 100 financia a compra de cordas de violão e materiais para oficinas culturais. }
                  @if (selectedVal() === 250) { R$ 250 apoia o cultivo de 50 mudas nativas do Cerrado no viveiro comunitário. }
                </p>
              </div>

              <!-- PIX Key Box -->
              <div class="space-y-1.5">
                <span class="text-xs font-bold text-slate-700 block">Chave PIX Oficial (E-mail):</span>
                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div class="truncate">
                    <code class="font-mono text-xs sm:text-sm font-bold text-slate-900 select-all">
                      {{ dataService.institution().donationInfo.pixKey }}
                    </code>
                    <span class="text-[10px] text-slate-500 block">Favorecido: {{ dataService.institution().donationInfo.pixReceiver }}</span>
                  </div>

                  <button 
                    (click)="copyPixKey()" 
                    class="px-4 py-2 rounded-xl bg-[#079F50] hover:bg-[#057d3e] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs shrink-0 cursor-pointer"
                  >
                    <mat-icon class="text-sm">content_copy</mat-icon>
                    <span>Copiar Chave</span>
                  </button>
                </div>
              </div>

              <!-- Bank Account Info -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <span class="font-bold text-slate-800 block">Dados para Transferência Bancária (TED/DOC):</span>
                <div class="grid grid-cols-2 gap-2 text-slate-600">
                  <div><strong>Banco:</strong> {{ dataService.institution().donationInfo.bankName }}</div>
                  <div><strong>Agência:</strong> {{ dataService.institution().donationInfo.bankAgency }}</div>
                  <div><strong>Conta:</strong> {{ dataService.institution().donationInfo.bankAccount }}</div>
                  <div><strong>Tipo:</strong> {{ dataService.institution().donationInfo.accountType }}</div>
                </div>
                <div class="pt-1 text-[11px] text-slate-500">
                  <strong>Razão Social:</strong> {{ dataService.institution().legalName }} · <strong>CNPJ:</strong> {{ dataService.institution().cnpj }}
                </div>
              </div>

            </div>

          </div>
        </div>

        <!-- Section 2: Doações Materiais e Necessidades -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div class="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <mat-icon>inventory_2</mat-icon>
              </div>
              <div>
                <h3 class="text-base font-bold text-slate-900">Doações de Materiais & Insumos</h3>
                <p class="text-xs text-slate-500">Lista atualizada de itens necessários na sede</p>
              </div>
            </div>

            <ul class="space-y-2.5 text-xs text-slate-600 pt-2">
              <li class="flex items-center gap-2">
                <mat-icon class="text-[#079F50] text-sm">check</mat-icon>
                <span><strong>Materiais Escolares:</strong> Cadernos, lápis de cor, papel A4 e livros infantis.</span>
              </li>
              <li class="flex items-center gap-2">
                <mat-icon class="text-[#079F50] text-sm">check</mat-icon>
                <span><strong>Ferramentas para a Horta:</strong> Enxadas, pás, mangueiras, regadores e composto.</span>
              </li>
              <li class="flex items-center gap-2">
                <mat-icon class="text-[#079F50] text-sm">check</mat-icon>
                <span><strong>Instrumentos Musicais:</strong> Violões acústicos, pandeiros, cajóns e afinadores.</span>
              </li>
              <li class="flex items-center gap-2">
                <mat-icon class="text-[#079F50] text-sm">check</mat-icon>
                <span><strong>Alimentos Não Perecíveis:</strong> Arroz, feijão, leite e insumos para cestas solidárias.</span>
              </li>
            </ul>

            <div class="pt-2">
              <a 
                [href]="'https://wa.me/' + dataService.institution().contact.whatsapp + '?text=Olá,%20gostaria%20de%20combinar%20uma%20doação%20material%20para%20o%20Instituto%20Raízes'"
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#079F50] hover:underline"
              >
                <span>Combinar entrega com nossa coordenação pelo WhatsApp</span>
                <mat-icon class="text-sm">arrow_forward</mat-icon>
              </a>
            </div>
          </div>

          <!-- Section 3: Parcerias Empresariais & ESG -->
          <div class="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-sky-50 text-[#32A5E8] flex items-center justify-center">
                <mat-icon>handshake</mat-icon>
              </div>
              <div>
                <h3 class="text-base font-bold text-slate-900">Parcerias Empresariais & ESG</h3>
                <p class="text-xs text-slate-500">Responsabilidade social e investimento de impacto</p>
              </div>
            </div>

            <p class="text-xs text-slate-600 leading-relaxed pt-2">
              Empresas, cooperativas e fundações podem patrocinar eixos estratégicos do Instituto Raízes da Comunidade em Padre Lúcio, fortalecendo seus programas de responsabilidade socioambiental (ESG) com prestação de contas com padrão MROSC.
            </p>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2 text-slate-700">
              <p><strong>Modalidades de Parceria:</strong></p>
              <p>· Adoção de turmas do Projeto Sementes do Saber (reforço escolar)</p>
              <p>· Apoio à expansão do viveiro agroecológico de mudas do Cerrado</p>
              <p>· Doação de equipamentos de informática e mobiliário corporativo</p>
            </div>

            <div class="pt-2">
              <a 
                routerLink="/contato" 
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#32A5E8] hover:underline"
              >
                <span>Solicite apresentação institucional para sua empresa</span>
                <mat-icon class="text-sm">arrow_forward</mat-icon>
              </a>
            </div>
          </div>

        </div>

      </div>
    </main>
  `
})
export class DonationsComponent {
  readonly dataService = inject(DataService);
  private readonly notification = inject(NotificationService);

  readonly selectedVal = signal<number>(50);

  copyPixKey() {
    const key = this.dataService.institution().donationInfo.pixKey;
    navigator.clipboard.writeText(key).then(() => {
      this.notification.show('Chave PIX copiada com sucesso para a área de transferência!', 'success');
    }).catch(() => {
      this.notification.show(`Chave PIX: ${key}`, 'info');
    });
  }
}
