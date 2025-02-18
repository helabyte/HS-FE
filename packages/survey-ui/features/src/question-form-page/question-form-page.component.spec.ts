import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormPageComponent } from './question-form-page.component';

describe('QuestionFormPageComponent', () => {
  let component: QuestionFormPageComponent;
  let fixture: ComponentFixture<QuestionFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionFormPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
