import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PrizmConfirmDialogService, PrizmOverlayInsidePlacement } from '@prizm-ui/components';
import { takeUntil } from 'rxjs/operators';
import { PrizmDestroyService } from '@prizm-ui/helpers';

@Component({
  selector: 'prizm-dialog-footer-template-example',
  templateUrl: 'RadiobuttonComponent.html',
  styles: [
    `
      .box {
        display: flex;
        gap: 1rem;
      }
      .custom-footer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    `
  ],
  providers: [PrizmDestroyService],
})
export class PrizmComponent {
  @ViewChild('footerTemp', { read: TemplateRef }) footerTemp!: TemplateRef<any>;
  @ViewChild('deleteFooterTemp', { read: TemplateRef }) deleteFooterTemp!: TemplateRef<any>;

  public positionVariants: PrizmOverlayInsidePlacement[] = Object.values(PrizmOverlayInsidePlacement);
  public position: PrizmOverlayInsidePlacement = PrizmOverlayInsidePlacement.CENTER;
  public backdrop = true;

  constructor(
    private readonly confirmDialogService: PrizmConfirmDialogService,
    private readonly destroy$: PrizmDestroyService
  ) {}

  public showSaveDialog(): void {
    this.confirmDialogService
      .open(
        `Вы действительно хотите сохранить изменения?`,
        {
          width: '500px',
          position: this.position,
          backdrop: this.backdrop,
          size: 'm',
          footer: this.footerTemp,
        }
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log(result);
      });
  }

  public showDeleteDialog(): void {
    this.confirmDialogService
      .open(
        `Вы уверены, что хотите удалить элемент?`,
        {
          width: '500px',
          position: this.position,
          backdrop: this.backdrop,
          size: 'm',
          footer: this.deleteFooterTemp,
        }
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log(result);
      });
  } 

  public confirmDelete(): void {
    console.log('Элемент удален');
  }
}