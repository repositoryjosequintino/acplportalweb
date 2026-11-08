import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { VolunteerArea } from '../../models/additional.model';

@Component({
  selector: 'app-volunteering',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <!-- Header -->
    <section class="bg-white border-b border-slate-100 py-12 lg:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#079F50] text-xs font-semibold">
          <span>PROGRAMA RAÍZES EM AÇÃO</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Voluntariado Comunitário
        </h1>
        <p class="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Doe parte do seu tempo e conhecimento para transformar vidas e fortalecer os laços de solidariedade em Padre Lúcio.
        </p>
      </div>
    </section>

    <!-- Content & Form Area -->
    <main class="py-12 bg-[#fafbfc]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Areas of Activity Cards -->
        <div class="space-y-6">
          <div class="text-center space-y-1">
            <span class="text-xs uppercase tracking-widest font-bold text-[#079F50]">Onde Você Pode Somar</span>
            <h2 class="text-2xl font-bold text-slate-900">Áreas de Atuação do Voluntariado</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-[#079F50] flex items-center justify-center">
                <mat-icon>school</mat-icon>
              </div>
              <h3 class="text-base font-bold text-slate-900">Educação & Reforço Escolar</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Apoio a crianças e adolescentes no contraturno em alfabetização, leitura e matemática básica.
              </p>
            </div>

            <div class="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div class="w-10 h-10 rounded-2xl bg-sky-50 text-[#32A5E8] flex items-center justify-center">
                <mat-icon>eco</mat-icon>
              </div>
              <h3 class="text-base font-bold text-slate-900">Agroecologia & Horta</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Preparo de canteiros, adubação orgânica, viveiro de mudas nativas do Cerrado e colheita solidária.
              </p>
            </div>

            <div class="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <mat-icon>music_note</mat-icon>
              </div>
              <h3 class="text-base font-bold text-slate-900">Oficinas Culturais & Artes</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Aulas de violão, percussão, artesanato regional e resgate de tradições orais e memória viva.
              </p>
            </div>

            <div class="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div class="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <mat-icon>campaign</mat-icon>
              </div>
              <h3 class="text-base font-bold text-slate-900">Comunicação Comunitária</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Cobertura fotográfica de eventos, mídias sociais (Instagram), redação de matérias e boletins.
              </p>
            </div>

            <div class="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div class="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <mat-icon>diversity_3</mat-icon>
              </div>
              <h3 class="text-base font-bold text-slate-900">Cidadania & Apoio Social</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Apoio a mutirões de documentação civil, triagem de doações e acolhimento das famílias.
              </p>
            </div>

            <div class="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div class="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <mat-icon>support_agent</mat-icon>
              </div>
              <h3 class="text-base font-bold text-slate-900">Apoio em Gestão & Projetos</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Organização documental, auxílio em prestação de contas, escrita de editais e captação de recursos.
              </p>
            </div>
          </div>
        </div>

        <!-- Application Form (Reactive Forms) -->
        <div class="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-8">
          
          <div class="space-y-2 border-b border-slate-100 pb-4">
            <span class="text-xs uppercase tracking-widest font-bold text-[#079F50]">Inscrição Online</span>
            <h2 class="text-2xl font-bold text-slate-900">Formulário de Inscrição para Voluntariado</h2>
            <p class="text-xs text-slate-500">
              Preencha os dados abaixo. Nossa coordenação entrará em contato para agendar uma conversa de acolhimento.
            </p>
          </div>

          @if (submittedProtocol(); as protocol) {
            <div class="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 text-center animate-fade-in">
              <mat-icon class="text-4xl text-[#079F50]">task_alt</mat-icon>
              <h3 class="text-lg font-bold text-slate-900">Candidatura Recebida com Sucesso!</h3>
              <p class="text-xs text-slate-600 max-w-md mx-auto">
                Obrigado por querer semear o bem junto ao Instituto Raízes da Comunidade. Seu protocolo oficial é:
              </p>
              <div class="p-2.5 rounded-xl bg-white border border-emerald-200 max-w-xs mx-auto font-mono text-sm font-bold text-[#079F50]">
                {{ protocol }}
              </div>
              <p class="text-[11px] text-slate-500 pt-2">
                Nossa equipe entrará em contato via WhatsApp ou e-mail nos próximos dias.
              </p>
              <button 
                (click)="resetForm()"
                class="px-4 py-2 rounded-xl bg-[#079F50] text-white text-xs font-semibold cursor-pointer"
              >
                Enviar Outra Inscrição
              </button>
            </div>
          } @else {
            <form [formGroup]="volunteerForm" (ngSubmit)="onSubmit()" class="space-y-6">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Nome Completo -->
                <div class="space-y-1.5">
                  <label for="volFullName" class="text-xs font-bold text-slate-700 block">
                    Nome Completo <span class="text-rose-500">*</span>
                  </label>
                  <input 
                    id="volFullName"
                    type="text" 
                    formControlName="fullName"
                    placeholder="Seu nome completo"
                    class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                  />
                  @if (volunteerForm.get('fullName')?.invalid && volunteerForm.get('fullName')?.touched) {
                    <span class="text-[10px] text-rose-500">Informe seu nome completo.</span>
                  }
                </div>

                <!-- E-mail -->
                <div class="space-y-1.5">
                  <label for="volEmail" class="text-xs font-bold text-slate-700 block">
                    E-mail de Contato <span class="text-rose-500">*</span>
                  </label>
                  <input 
                    id="volEmail"
                    type="email" 
                    formControlName="email"
                    placeholder="seuemail@exemplo.com"
                    class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                  />
                  @if (volunteerForm.get('email')?.invalid && volunteerForm.get('email')?.touched) {
                    <span class="text-[10px] text-rose-500">Informe um e-mail válido.</span>
                  }
                </div>

                <!-- Telefone / WhatsApp -->
                <div class="space-y-1.5">
                  <label for="volPhone" class="text-xs font-bold text-slate-700 block">
                    Telefone / WhatsApp <span class="text-rose-500">*</span>
                  </label>
                  <input 
                    id="volPhone"
                    type="text" 
                    formControlName="phone"
                    placeholder="(XX) 9XXXX-XXXX"
                    class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                  />
                  @if (volunteerForm.get('phone')?.invalid && volunteerForm.get('phone')?.touched) {
                    <span class="text-[10px] text-rose-500">Informe seu telefone de contato.</span>
                  }
                </div>

                <!-- Cidade / Bairro -->
                <div class="space-y-1.5">
                  <label for="volCity" class="text-xs font-bold text-slate-700 block">
                    Cidade / Bairro onde Reside <span class="text-rose-500">*</span>
                  </label>
                  <input 
                    id="volCity"
                    type="text" 
                    formControlName="city"
                    placeholder="Ex: Padre Lúcio - GO, Águas Lindas, Ceilândia..."
                    class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                  />
                  @if (volunteerForm.get('city')?.invalid && volunteerForm.get('city')?.touched) {
                    <span class="text-[10px] text-rose-500">Informe sua cidade.</span>
                  }
                </div>
              </div>

              <!-- Áreas de Interesse -->
              <div class="space-y-2">
                <label for="volPrimaryArea" class="text-xs font-bold text-slate-700 block">
                  Área de Maior Interesse <span class="text-rose-500">*</span>
                </label>
                <select 
                  id="volPrimaryArea"
                  formControlName="primaryArea"
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                >
                  <option value="">Selecione uma área preferencial</option>
                  @for (area of availableAreas; track area) {
                    <option [value]="area">{{ area }}</option>
                  }
                </select>
              </div>

              <!-- Disponibilidade e Horas -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-1.5">
                  <label for="volAvailability" class="text-xs font-bold text-slate-700 block">
                    Disponibilidade Preferencial
                  </label>
                  <select 
                    id="volAvailability"
                    formControlName="availability"
                    class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                  >
                    <option value="Finais de Semana">Finais de Semana (Sábados/Domingos)</option>
                    <option value="Dias Úteis (Manhã)">Dias Úteis (Período da Manhã)</option>
                    <option value="Dias Úteis (Tarde)">Dias Úteis (Período da Tarde)</option>
                    <option value="Flexível">Horários Flexíveis</option>
                  </select>
                </div>

                <div class="space-y-1.5">
                  <label for="volWeeklyHours" class="text-xs font-bold text-slate-700 block">
                    Horas semanais estimadas
                  </label>
                  <select 
                    id="volWeeklyHours"
                    formControlName="weeklyHours"
                    class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                  >
                    <option [value]="2">2 horas por semana</option>
                    <option [value]="4">4 horas por semana</option>
                    <option [value]="6">6 horas por semana</option>
                    <option [value]="8">8 ou mais horas</option>
                  </select>
                </div>
              </div>

              <!-- Experiência / Motivação -->
              <div class="space-y-1.5">
                <label for="volExperienceNotes" class="text-xs font-bold text-slate-700 block">
                  Conte um pouco sobre você, sua formação ou motivação para ser voluntário
                </label>
                <textarea 
                  id="volExperienceNotes"
                  rows="3"
                  formControlName="experienceNotes"
                  placeholder="Ex: Sou estudante/professor/agricultor/morador e gostaria de ajudar com..."
                  class="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#079F50]/20 focus:bg-white"
                ></textarea>
              </div>

              <!-- LGPD Consent -->
              <div class="flex items-start gap-2.5 pt-2">
                <input 
                  type="checkbox" 
                  id="lgpdConsent"
                  formControlName="lgpdConsent"
                  class="mt-0.5 rounded text-[#079F50] focus:ring-[#079F50]"
                />
                <label for="lgpdConsent" class="text-[11px] text-slate-500 leading-snug">
                  Autorizo o uso dos meus dados exclusivamente para fins de contato e organização das atividades do programa de voluntariado do Instituto Raízes da Comunidade, em conformidade com a <strong>LGPD (Lei 13.709/2018)</strong>.
                </label>
              </div>
              @if (volunteerForm.get('lgpdConsent')?.invalid && volunteerForm.get('lgpdConsent')?.touched) {
                <span class="text-[10px] text-rose-500 block">É necessário concordar com os termos de privacidade para enviar a inscrição.</span>
              }

              <!-- Submit Button -->
              <div class="pt-4">
                <button 
                  type="submit" 
                  [disabled]="volunteerForm.invalid"
                  class="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#079F50] hover:bg-[#057d3e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <mat-icon class="text-sm">send</mat-icon>
                  <span>Enviar Inscrição de Voluntariado</span>
                </button>
              </div>

            </form>
          }

        </div>

      </div>
    </main>
  `
})
export class VolunteeringComponent {
  private readonly dataService = inject(DataService);
  private readonly notification = inject(NotificationService);

  readonly availableAreas: VolunteerArea[] = [
    'Educação & Reforço Escolar',
    'Agroecologia & Horta Comunitária',
    'Oficinas Culturais & Música',
    'Assistência & Cidadania',
    'Esporte & Lazer',
    'Comunicação & Mídias Sociais',
    'Apoio Administrativo & Captação'
  ];

  readonly submittedProtocol = signal<string | null>(null);

  readonly volunteerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl('', [Validators.required]),
    primaryArea: new FormControl('', [Validators.required]),
    availability: new FormControl<'Finais de Semana' | 'Dias Úteis (Manhã)' | 'Dias Úteis (Tarde)' | 'Flexível'>('Finais de Semana'),
    weeklyHours: new FormControl<number>(4),
    experienceNotes: new FormControl(''),
    lgpdConsent: new FormControl(false, [Validators.requiredTrue])
  });

  onSubmit() {
    if (this.volunteerForm.invalid) {
      this.volunteerForm.markAllAsTouched();
      return;
    }

    const val = this.volunteerForm.value;
    this.dataService.submitVolunteerApplication({
      fullName: val.fullName!,
      email: val.email!,
      phone: val.phone!,
      city: val.city!,
      areasOfInterest: [val.primaryArea as VolunteerArea],
      availability: val.availability || 'Finais de Semana',
      weeklyHours: val.weeklyHours || 4,
      experienceNotes: val.experienceNotes || 'Disposição para apoiar a comunidade de Padre Lúcio.'
    });

    const protocol = `VOL-${Date.now().toString().slice(-6)}`;
    this.submittedProtocol.set(protocol);
    this.notification.show(`Inscrição enviada com sucesso! Protocolo #${protocol}`, 'success');
  }

  resetForm() {
    this.submittedProtocol.set(null);
    this.volunteerForm.reset({
      availability: 'Finais de Semana',
      weeklyHours: 4,
      lgpdConsent: false
    });
  }
}
