import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/RX';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor() { }

  userName: string = 'user';
  scrollHeight:number = 0;
  ngOnInit() {
    Observable.fromEvent(window,'scroll').subscribe(
      (event) => {
        const h = document.documentElement.clientHeight;
        const H = document.body.clientHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.scrollHeight = scrollTop;
      }
    )

    if (localStorage.getItem('username') !== undefined) {
      this.userName = localStorage.getItem('username');
    }
  }

}
