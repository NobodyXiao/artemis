import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertDialogComponent implements OnInit {

  public title: string;
  public message: string;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    public _authService:AuthService
  ) {

  }

  ngOnInit() {
  }
  
}
