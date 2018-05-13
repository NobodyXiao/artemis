import { Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor() { }

  userName: string = 'user';

  ngOnInit() {
    if (localStorage.getItem('username') !== undefined) {
      this.userName = localStorage.getItem('username');
    }
  }

}
