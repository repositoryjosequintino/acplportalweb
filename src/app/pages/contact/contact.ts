import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <!-- Header -->
    <section class="bg-white border-b border-slate-100 py-12 lg:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#079F50] text-xs font-semibold">
          <span>CANAL OFICIAL DE ATENDIMENTO</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Fale Conosco
        </h1>
        <p class="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Estamos à disposição para dúvidas, agendamento de visitas, parcerias e informações institucionais sobre Padre Lúcio.
        </p>
      </div>
    </section>

    <!-- Main Content Grid -->
    <main class="py-12 bg-[#fafbfc]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Left Column: Contact Channels & Map -->
          <div class="lg:col-span-5 space-y-6">
            
            <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <h2 class="text-base font-bold text-slate-900">Informações Institucionais</h2>

              <div class="space-y-4 text-xs">
                <!-- Endereço -->
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-emerald-50 text-[#079F50] flex items-center justify-center shrink-0 mt-0.5">
                    <mat-icon class="text-base">location_on</mat-icon>
                  </div>
                  <div>
                    <span class="font-bold text-slate-800 block">Sede da Associação:</span>
                    <p class="text-slate-600 leading-relaxed">
                      {{ dataService.institution().headquartersAddress.street }}<br />
                      {{ dataService.institution().headquartersAddress.neighborhood }} - {{ dataService.institution().headquartersAddress.city }}/{{ dataService.institution().headquartersAddress.state }}<br />
                      CEP: {{ dataService.institution().headquartersAddress.zipCode }}
                    </p>
                    <span class="text-[11px] text-slate-400 mt-1 block">
                      Referência: {{ dataService.institution().headquartersAddress.reference }}
                    </span>
                  </div>
                </div>

                <!-- WhatsApp -->
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <mat-icon class="text-base">chat</mat-icon>
                  </div>
                  <div>
                    <span class="font-bold text-slate-800 block">WhatsApp Oficial:</span>
                    <a 
                      [href]="'https://wa.me/' + dataService.institution().contact.whatsapp" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-[#079F50] font-semibold hover:underline block"
                    >
                      {{ dataService.institution().contact.phone }}
                    </a>
                  </div>
                </div>

                <!-- E-mail -->
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-sky-50 text-[#32A5E8] flex items-center justify-center shrink-0 mt-0.5">
                    <mat-icon class="text-base">email</mat-icon>
                  </div>
                  <div>
                    <span class="font-bold text-slate-800 block">E-mail Institucional:</span>
                    <a 
                      [href]="'mailto:' + dataService.institution().contact.email" 
                      class="text-slate-700 hover:text-slate-900 hover:underline block"
                    >
                      {{ dataService.institution().contact.email }}
                    </a>
                  </div>
                </div>

                <!-- Instagram -->
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                    <mat-icon class="text-base">photo_camera</mat-icon>
                  </div>
                  <div>
                    <span class="font-bold text-slate-800 block">Instagram Oficial:</span>
                    <a 
                      [href]="dataService.institution().contact.instagramUrl" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-[#079F50] font-semibold hover:underline block"
                    >
                      {{ dataService.institution().contact.instagram }} (Clique para seguir)
                    </a>
                  </div>
                </div>

                <!-- Horário -->
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                    <mat-icon class="text-base">schedule</mat-icon>
                  </div>
                  <div>
                    <span class="font-bold text-slate-800 block">Horário de Atendimento da Secretaria:</span>
                    <p class="text-slate-600">{{ dataService.institution().contact.openingHours }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Vector Map Card -->
            <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <span class="text-xs font-bold text-slate-800 block">Localização em Padre Lúcio:</span>
              <div class="rounded-2xl overflow-hidden bg-emerald-50 border border-emerald-100 p-6 text-center space-y-3 relative">
                <div class="w-12 h-12 rounded-full bg-[#079F50] text-white flex items-center justify-center mx-auto shadow-md">
                  <mat-icon>place</mat-icon>
                </div>
                <div class="space-y-1">
                  <h3 class="text-xs font-bold text-slate-900">Povoado de Padre Lúcio - GO</h3>
                  <p class="text-[11px] text-slate-600 max-w-xs mx-auto">
                    Localizado na região de transição com o Distrito Federal, com acesso facilitado pela rodovia GO e vicinais asfaltadas.
                  </p>
                </div>
                <a 
                  href="https://maps.google.com/?q=Padre+Lucio+Goias" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-800 text-xs font-semibold shadow-2xs hover:bg-slate-50 transition-colors border border-slate-200"
                >
                  <mat-icon class="text-sm text-[#079F50]">directions</mat-icon>
                  <span>Abrir no Google Maps</span>
                </a>
              </div>
            </div>

          </div>

          <!-- Right Column: Contact Reactive Form -->
          <div class="lg:col-span-7">
            <div class="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              
              <div class="space-y-1 border-b border-slate-100 pb-4">
                <span class="text-xs uppercase tracking-widest font-bold text-[#079F50]">Envie sua Mensagem</span>
                <h2 class="text-2xl font-bold text-slate-900">Formulário de Contato Direto</h2>
                <p class="text-xs text-slate-500">
                  Preencha os campos abaixo para nos enviar sua dúvida, proposta de parceria ou solicitação de informação.
                </p>
              </div>

              @if (messageSent()) {
                <div class="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 text-center animate-fade-in">
                  <mat-icon class="text-4xl text-[#079F50]">mark_email_read</mat-icon>
                  <h3 class="text-lg font-bold text-slate-900">Mensagem Enviada com Sucesso!</h3>
                  <p class="text-xs text-slate-600 max-w-md mx-auto">
                    Recebemos seu contato. Nossa secretaria institucional responderá o mais breve possível pelo e-mail ou WhatsApp informado.
                  </p>
                  <button 
                    (click)="resetForm()"
                    class="px-4 py-2 rounded-xl bg-[#079F50] text-white text-xs font-semibold cursor-pointer"
                  >
                    Enviar Nova Mensagem
                  </button>
                </div>
              } @else {
                <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4">
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label for="contactName" class="text-xs font-bold text-slate-700 block">
                        Seu Nome <span class="text-rose-500">*</span>
                      </label>
                      <input 
                        id="contactName"
                        type="text" 
                        formControlName="name"
                        placeholder="Nome completo"
                        class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                      />
                      @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                        <span class="text-[10px] text-rose-500">Por favor, informe seu nome.</span>
                      }
                    </div>

                    <div class="space-y-1.5">
                      <label for="contactEmail" class="text-xs font-bold text-slate-700 block">
                        E-mail <span class="text-rose-500">*</span>
                      </label>
                      <input 
                        id="contactEmail"
                        type="email" 
                        formControlName="email"
                        placeholder="seuemail@exemplo.com"
                        class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                      />
                      @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                        <span class="text-[10px] text-rose-500">Informe um e-mail válido.</span>
                      }
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label for="contactPhone" class="text-xs font-bold text-slate-700 block">Telefone / WhatsApp</label>
                      <input 
                        id="contactPhone"
                        type="text" 
                        formControlName="phone"
                        placeholder="(XX) 9XXXX-XXXX"
                        class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                      />
                    </div>

                    <div class="space-y-1.5">
                      <label for="contactSubject" class="text-xs font-bold text-slate-700 block">
                        Assunto <span class="text-rose-500">*</span>
                      </label>
                      <select 
                        id="contactSubject"
                        formControlName="subject"
                        class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                      >
                        <option value="">Selecione o assunto</option>
                        <option value="Dúvidas Gerais">Dúvidas Gerais</option>
                        <option value="Parceria Institucional ou Empresarial">Parceria Institucional ou Empresarial</option>
                        <option value="Voluntariado">Voluntariado e Apoio</option>
                        <option value="Transparência e MROSC">Transparência e MROSC</option>
                        <option value="Imprensa e Comunicação">Imprensa e Comunicação</option>
                      </select>
                    </div>
                  </div>

                  <div class="space-y-1.5">
                    <label for="contactMessage" class="text-xs font-bold text-slate-700 block">
                      Mensagem <span class="text-rose-500">*</span>
                    </label>
                    <textarea 
                      id="contactMessage"
                      rows="4"
                      formControlName="message"
                      placeholder="Escreva sua mensagem com detalhes..."
                      class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                    ></textarea>
                    @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                      <span class="text-[10px] text-rose-500">Escreva sua mensagem.</span>
                    }
                  </div>

                  <!-- Consent -->
                  <div class="flex items-start gap-2.5 pt-1">
                    <input 
                      type="checkbox" 
                      id="contactLgpd"
                      formControlName="lgpdConsent"
                      class="mt-0.5 rounded text-[#079F50] focus:ring-[#079F50]"
                    />
                    <label for="contactLgpd" class="text-[11px] text-slate-500 leading-snug">
                      Concordo com o tratamento dos meus dados exclusivamente para retorno deste contato, em atenção à <strong>LGPD (Lei 13.709/2018)</strong>.
                    </label>
                  </div>

                  <!-- Submit -->
                  <div class="pt-2">
                    <button 
                      type="submit" 
                      [disabled]="contactForm.invalid"
                      class="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#079F50] hover:bg-[#057d3e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <mat-icon class="text-sm">send</mat-icon>
                      <span>Enviar Mensagem</span>
                    </button>
                  </div>

                </form>
              }

            </div>
          </div>

        </div>

      </div>
    </main>
  `
})
export class ContactComponent {
  readonly dataService = inject(DataService);
  private readonly notification = inject(NotificationService);

  readonly messageSent = signal<boolean>(false);

  readonly contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
    lgpdConsent: new FormControl(false, [Validators.requiredTrue])
  });

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.messageSent.set(true);
    this.notification.show('Mensagem enviada com sucesso! Responderemos em breve.', 'success');
  }

  resetForm() {
    this.messageSent.set(false);
    this.contactForm.reset();
  }
}
