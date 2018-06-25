import { Component, OnInit, ViewEncapsulation, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentFactoryResolver} from '@angular/core';
import { coms } from '../../models/comMgr';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalPageComponent implements OnInit{

  @ViewChild('dmroom', {read: ViewContainerRef}) dmRoom: ViewContainerRef
  personalItemArr:Array<any> = [ '个人资料', '安全设置', 'Uolo大事记'];
  selecteditem:number = -1;

  constructor(
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.addItemComponent(0);
  }
  addItemComponent(index){
    let com = this.cfr.resolveComponentFactory(coms[index]);
    this.dmRoom.clear();
    this.dmRoom.createComponent(com);
    this.selecteditem = index;
  }

}
