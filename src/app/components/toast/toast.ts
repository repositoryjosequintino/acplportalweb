import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (notification.currentToast(); as toast) {
      <div 
        class="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-xl border border-slate-200/90 text-slate-800 backdrop-blur-md"
        role="alert"
      >
        <div 
          class="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
          [class.bg-emerald-50]="toast.type === 'success'"
          [class.text-[#079F50]]="toast.type === 'success'"
          [class.bg-sky-50]="toast.type === 'info'"
          [class.text-[#32A5E8]]="toast.type === 'info'"
          [class.bg-amber-50]="toast.type === 'warning'"
          [class.text-amber-600]="toast.type === 'warning'"
          [class.bg-rose-50]="toast.type === 'error'"
          [class.text-rose-600]="toast.type === 'error'"
        >
          <mat-icon class="text-lg leading-none">{{ toast.icon }}</mat-icon>
        </div>

        <p class="text-xs md:text-sm font-medium text-slate-700 leading-snug flex-1">
          {{ toast.message }}
        </p>

        <button 
          (click)="notification.dismiss()" 
          class="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Fechar notificação"
        >
          <mat-icon class="text-base leading-none">close</mat-icon>
        </button>
      </div>
    }
  `
})
export class Toast {
  readonly notification = inject(NotificationService);
}
