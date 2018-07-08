import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AppNavigationService } from '../../services/app-navigation.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers:[ DialogService ],
  encapsulation: ViewEncapsulation.None
})

export class HomePageComponent implements OnInit {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    public _appNavigationService: AppNavigationService,
  ) {}
  public navigationExtras: NavigationExtras;
  public backRouterLink: string;
  error:string = '';
  ngOnInit() {
    this._route.queryParams.subscribe((params: Params) => {
      if (params['backRouterLink']) {
        let index = params['backRouterLink'].indexOf('?');
        if (index > -1) {
          this.backRouterLink = params['backRouterLink'].substr(0, index);
        } else {
          this.backRouterLink = params['backRouterLink'];
        }
        this.navigationExtras = {
          queryParams: this._router.parseUrl(params['backRouterLink']).queryParams,
        };
      }
    });
  }
  turnDetailPage(params){
    localStorage.setItem('detailType', params.mime);
    localStorage.setItem('detailPath', params.rpath);

    //this._router.navigate(['/detail'],{ queryParams: { title: params.title}});
    // 这里我们通过路由传递整个文章对象，而不仅仅是title， 这样有利于我们进行数据的处理
    this._router.navigate(['/detail'],{ queryParams: params});
  }
}
