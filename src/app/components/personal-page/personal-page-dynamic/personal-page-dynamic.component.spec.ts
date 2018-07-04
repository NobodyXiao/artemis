import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPageDynamicComponent } from './personal-page-dynamic.component';

describe('PersonalPageComponent', () => {
  let component: PersonalPageDynamicComponent;
  let fixture: ComponentFixture<PersonalPageDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalPageDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalPageDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
