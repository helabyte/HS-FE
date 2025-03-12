import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionInfoComponent } from './question-info.component';

describe('QuestionInfoComponent', () => {
  let component: QuestionInfoComponent;
  let fixture: ComponentFixture<QuestionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
