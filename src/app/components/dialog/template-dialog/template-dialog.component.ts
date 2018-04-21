import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateDialogComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;

  constructor(public dialogRef: MatDialogRef<TemplateDialogComponent>) {

  }

  ngOnInit() {
  }

}
