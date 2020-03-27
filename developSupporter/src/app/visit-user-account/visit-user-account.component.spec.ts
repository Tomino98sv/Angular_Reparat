import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitUserAccountComponent } from './visit-user-account.component';

describe('VisitUserAccountComponent', () => {
  let component: VisitUserAccountComponent;
  let fixture: ComponentFixture<VisitUserAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitUserAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
