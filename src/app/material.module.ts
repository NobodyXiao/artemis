import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatMenuModule,
  MatGridListModule,
  MatDialogModule,
  MatChipsModule,
  // and so on...
} from '@angular/material';
const MAT_MODULES  = [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatGridListModule,
    MatDialogModule,
    MatChipsModule
  // and so on...
];

@NgModule({
  imports: MAT_MODULES,
  exports: MAT_MODULES,
  declarations: []
})
export class MaterialModule { }
