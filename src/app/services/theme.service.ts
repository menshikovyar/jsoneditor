import { Injectable, inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { PrizmThemeService } from '@prizm-ui/theme';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly theme = inject(PrizmThemeService);
  private readonly storage = inject(LOCAL_STORAGE);

  readonly isDark$ = this.theme.change$.pipe(map((i) => i.theme === 'dark'));

  constructor() {}

  initTheme(): void {
    if (this.storage.getItem('theme')) {
      this.theme.update(this.storage.getItem('theme') as string);
    } else {
      this.storage.setItem('theme', 'dark');
      this.theme.update('dark');
    }
  }

  toggle(isDark: boolean): void {
    const theme = isDark ? 'dark' : 'light';

    this.storage.setItem('theme', theme);
    this.theme.update(theme);
  }
}
