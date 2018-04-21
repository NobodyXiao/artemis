import { Observable } from 'rxjs/Observable';
import { ConfirmDialogComponent } from '../components/dialog/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../components/dialog/alert-dialog/alert-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class DialogService {

    constructor(public dialog: MatDialog) { }

    //确认对话框
    public confirm(title: string, message: string, viewContainerRef: any = ''): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmDialogComponent>;
        let config = new MatDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(ConfirmDialogComponent, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    //alert对话框
    public alert(title: string, message: string, viewContainerRef: any = ''): Observable<boolean> {

        let dialogRef: MatDialogRef<AlertDialogComponent>;
        let config = new MatDialogConfig();
        // config.width = '300px';
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(AlertDialogComponent, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}
