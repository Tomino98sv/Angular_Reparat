import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactToIssueComponent } from './react-to-issue.component';

describe('ReactToIssueComponent', () => {
  let component: ReactToIssueComponent;
  let fixture: ComponentFixture<ReactToIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactToIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactToIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
