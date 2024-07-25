import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrizmToggleComponent } from '@prizm-ui/components';
import { PrizmIconsFullRegistry } from '@prizm-ui/icons/core';
import { prizmIconsMoon, prizmIconsSun } from '@prizm-ui/icons/full/source';
import { ThemeService } from '@services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule, PrizmToggleComponent],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  private readonly iconsFullRegistry = inject(PrizmIconsFullRegistry);
  private readonly theme = inject(ThemeService);

  isDark$: Observable<boolean>;

  constructor() {
    this.isDark$ = this.theme.isDark$;
    this.iconsFullRegistry.registerIcons(prizmIconsMoon, prizmIconsSun);
  }

  toggle(isDark: boolean): void {
    this.theme.toggle(isDark);
  }
}
