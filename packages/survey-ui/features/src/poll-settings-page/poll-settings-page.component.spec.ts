import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollSettingsPageComponent } from './poll-settings-page.component';

describe('PollSettingsPageComponent', () => {
  let component: PollSettingsPageComponent;
  let fixture: ComponentFixture<PollSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollSettingsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PollSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
