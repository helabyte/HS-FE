import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizationTypePageComponent } from './visualization-type-page.component';

describe('VisualizationTypePageComponent', () => {
  let component: VisualizationTypePageComponent;
  let fixture: ComponentFixture<VisualizationTypePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationTypePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizationTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
