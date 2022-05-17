import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddStandartHoursComponent } from './admin-add-standart-hours.component';

describe('AdminAddStandartHoursComponent', () => {
  let component: AdminAddStandartHoursComponent;
  let fixture: ComponentFixture<AdminAddStandartHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddStandartHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddStandartHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
