import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InforBoxComponent } from './infor-box.component';

describe('InforBoxComponent', () => {
  let component: InforBoxComponent;
  let fixture: ComponentFixture<InforBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InforBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InforBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
