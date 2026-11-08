import { Injectable, signal } from '@angular/core';

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  icon?: string;
  durationMs?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly currentToast = signal<ToastNotification | null>(null);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  show(message: string, type: ToastNotification['type'] = 'success', icon?: string, durationMs = 4000) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    const defaultIcons: Record<ToastNotification['type'], string> = {
      success: 'check_circle',
      info: 'info',
      warning: 'warning_amber',
      error: 'error_outline'
    };

    this.currentToast.set({
      id: `toast-${Date.now()}`,
      type,
      message,
      icon: icon || defaultIcons[type],
      durationMs
    });

    this.timeoutId = setTimeout(() => {
      this.currentToast.set(null);
    }, durationMs);
  }

  dismiss() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.currentToast.set(null);
  }
}
