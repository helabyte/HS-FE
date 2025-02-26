import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionViewerPageComponent } from './question-viewer-page.component';

describe('QuestionViewerPageComponent', () => {
  let component: QuestionViewerPageComponent;
  let fixture: ComponentFixture<QuestionViewerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionViewerPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionViewerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
