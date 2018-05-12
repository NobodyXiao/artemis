import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { IappConfig } from '../../../app/iapp-config';
import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { APP_CONFIG } from '../../../app/app-config';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material'
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-infor-box',
  templateUrl: './infor-box.component.html',
  styleUrls: ['./infor-box.component.css'],
  providers: [DialogService]
})

export class InforBoxComponent implements OnInit {
  @Output() eventToEmitContentList = new EventEmitter;
  isclickLick:boolean = false;
  public error : string = '';
  public dialogRef: MatDialogRef<any>;
  public navigationExtras: NavigationExtras;
  public backRouterLink: string;
  constructor(
    private _mdialog: MatDialog,
    private _dialogService: DialogService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this._route.queryParams.subscribe((params: Params) => {
    //   if (params['backRouterLink']) {
    //     let index = params['backRouterLink'].indexOf('?');
    //     if (index > -1) {
    //       this.backRouterLink = params['backRouterLink'].substr(0, index);
    //     } else {
    //       this.backRouterLink = params['backRouterLink'];
    //     }
    //     this.navigationExtras = {
    //       queryParams: this._router.parseUrl(params['backRouterLink']).queryParams,
    //     };
    //   }
    // });
  }
  markLick(){
    this.isclickLick = !this.isclickLick;
  }
  toDetailPage(event) {
    this.eventToEmitContentList.emit(event);
  }
}
