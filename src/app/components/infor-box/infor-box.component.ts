import { Component, OnInit, EventEmitter, Output, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-infor-box',
  templateUrl: './infor-box.component.html',
  styleUrls: ['./infor-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class InforBoxComponent implements OnInit {

  constructor(
  ) { }

  @Input() articleInfor: any;
  @Output() eventToEmitContentList = new EventEmitter;
  isclickLick:boolean = false;
  error : string = '';
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
