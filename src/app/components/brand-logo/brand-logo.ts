import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-brand-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-3 select-none">
      <!-- Official Emblem Seal -->
      <div 
        class="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
        [style.width.px]="size()" 
        [style.height.px]="size()"
      >
        <img 
          src="/assets/logo.png" 
          alt="Logomarca Oficial do Instituto Raízes da Comunidade - Associação Comunitária de Padre Lúcio" 
          class="w-full h-full object-contain drop-shadow-md rounded-full"
          referrerpolicy="no-referrer"
          loading="eager"
        />
      </div>

      <!-- Typography Wordmark -->
      @if (showText()) {
        <div class="flex flex-col text-left">
          <span class="font-extrabold tracking-tight text-slate-900 leading-tight" [class]="textClass()">
            INSTITUTO <span class="text-[#079F50]">RAÍZES</span>
          </span>
          <span class="text-[10px] tracking-wider uppercase font-bold text-slate-500 leading-none">
            Associação Comunitária Padre Lúcio
          </span>
        </div>
      }
    </div>
  `
})
export class BrandLogo {
  size = input<number>(44);
  showText = input<boolean>(true);
  textClass = input<string>('text-sm md:text-base');
}
