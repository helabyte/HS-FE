import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLogInfoComponent } from './change-log-info.component';

describe('ChangeLogInfoComponent', () => {
  let component: ChangeLogInfoComponent;
  let fixture: ComponentFixture<ChangeLogInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeLogInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeLogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
