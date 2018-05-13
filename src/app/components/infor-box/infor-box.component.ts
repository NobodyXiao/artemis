import { Component, OnInit, EventEmitter, Output, Input, ViewEncapsulation} from '@angular/core';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { IappConfig } from '../../../app/iapp-config';
import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { APP_CONFIG } from '../../../app/app-config';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material'

@Component({
  selector: 'app-infor-box',
  templateUrl: './infor-box.component.html',
  styleUrls: ['./infor-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class InforBoxComponent implements OnInit {

  constructor(
    private _mdialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  @Input() articleInfor: any;
  @Output() eventToEmitContentList = new EventEmitter;
  isclickLick:boolean = false;
  error : string = '';
  dialogRef: MatDialogRef<any>;
  navigationExtras: NavigationExtras;
  backRouterLink: string;

  ngOnInit() {
  }
  markLick(){
    this.isclickLick = !this.isclickLick;
  }
  toDetailPage(event) {
    this.eventToEmitContentList.emit(event);
  }
}
