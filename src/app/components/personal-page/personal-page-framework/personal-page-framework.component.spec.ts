import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPageFrameworkComponent } from './personal-page-framework.component';

describe('PersonalPageFrameworkComponent', () => {
  let component: PersonalPageFrameworkComponent;
  let fixture: ComponentFixture<PersonalPageFrameworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalPageFrameworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalPageFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
