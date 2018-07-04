import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { PersonalPageDynamicComponent } from '../personal-page-dynamic/personal-page-dynamic.component';

@Component({
  selector: 'app-personal-page-framework',
  templateUrl: './personal-page-framework.component.html',
  styleUrls: ['./personal-page-framework.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalPageFrameworkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
