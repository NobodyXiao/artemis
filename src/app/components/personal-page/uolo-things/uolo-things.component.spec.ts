import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UoloThingsComponent } from './uolo-things.component';

describe('UoloThingsComponent', () => {
  let component: UoloThingsComponent;
  let fixture: ComponentFixture<UoloThingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UoloThingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UoloThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
