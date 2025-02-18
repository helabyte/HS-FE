import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionAssignmentPageComponent } from './question-assignment-page.component';

describe('QuestionAssignmentPageComponent', () => {
  let component: QuestionAssignmentPageComponent;
  let fixture: ComponentFixture<QuestionAssignmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAssignmentPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionAssignmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
