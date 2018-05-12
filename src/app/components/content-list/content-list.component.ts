import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

  constructor() { }
  @Output() eventToEmitHome = new EventEmitter;
  ngOnInit() {
  }
  //点击列表页的文章，要向上发送事件，使首页响应事件并跳转
  toHomePage(event){
    this.eventToEmitHome.emit(event);
  }
}
