import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  viewChild,
  ElementRef,
  afterNextRender,
  DestroyRef
} from '@angular/core';
import {
  Router,
  RouterOutlet,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Toast } from './components/toast/toast';
import { animate, cubicBezier } from 'motion';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  
  readonly pageOutlet = viewChild<ElementRef<HTMLElement>>('pageOutlet');
  readonly currentUrl = signal<string>(this.router.url);
  readonly isNavigating = signal<boolean>(false);
  readonly navProgress = signal<number>(0);

  readonly isAdminRoute = computed(() => {
    return this.currentUrl().startsWith('/admin');
  });

  private progressTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    const appleEase = cubicBezier(0.16, 1, 0.3, 1);

    const sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.progressTimer) clearTimeout(this.progressTimer);
        this.isNavigating.set(true);
        this.navProgress.set(25);

        // Smooth increment while routing resolves
        this.progressTimer = setTimeout(() => {
          if (this.isNavigating()) {
            this.navProgress.set(70);
          }
        }, 90);
      } else if (event instanceof NavigationEnd) {
        if (this.progressTimer) clearTimeout(this.progressTimer);
        this.currentUrl.set(event.urlAfterRedirects);
        this.navProgress.set(100);

        if (typeof window !== 'undefined') {
          // Instant top reset before the fluid entrance
          window.scrollTo({ top: 0, behavior: 'instant' });

          // Apple buttery route entrance animation
          const el = this.pageOutlet()?.nativeElement;
          if (el) {
            animate(
              el,
              {
                opacity: [0, 1],
                y: [14, 0],
                scale: [0.994, 1],
                filter: ['blur(4px)', 'blur(0px)']
              },
              {
                duration: 0.38,
                ease: appleEase
              }
            );
          }
        }

        // Fade out progress indicator smoothly
        setTimeout(() => {
          this.isNavigating.set(false);
          this.navProgress.set(0);
        }, 220);
      } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
        if (this.progressTimer) clearTimeout(this.progressTimer);
        this.navProgress.set(100);
        setTimeout(() => {
          this.isNavigating.set(false);
          this.navProgress.set(0);
        }, 180);
      }
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
      if (this.progressTimer) clearTimeout(this.progressTimer);
    });

    // Initial render entrance
    afterNextRender(() => {
      const el = this.pageOutlet()?.nativeElement;
      if (el) {
        animate(
          el,
          {
            opacity: [0, 1],
            y: [12, 0],
            scale: [0.995, 1],
            filter: ['blur(3px)', 'blur(0px)']
          },
          {
            duration: 0.35,
            ease: appleEase
          }
        );
      }
    });
  }
}
