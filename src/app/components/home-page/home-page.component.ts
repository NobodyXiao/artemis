import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../../services/window-ref.service';
import Big from '../../../assets/js/extend.js';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  value = new Big();
  constructor(
    private winRef: WindowRefService
  ) {
    console.log("hello workd", this.value.Context)
    console.log('Native window obj',this.value);
   }

  ngOnInit() {
  }
  turnDetailPage(){
    console.log('111');
  }
}
