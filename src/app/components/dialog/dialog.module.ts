import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { TemplateDialogComponent } from './template-dialog/template-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ConfirmDialogComponent, AlertDialogComponent, TemplateDialogComponent],
  entryComponents: [ConfirmDialogComponent, AlertDialogComponent, TemplateDialogComponent]
})
export class DialogModule { }
