import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentIssueComponent } from './comment-issue.component';

describe('CommentIssueComponent', () => {
  let component: CommentIssueComponent;
  let fixture: ComponentFixture<CommentIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
