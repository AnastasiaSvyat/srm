import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffListComponent } from './admin-staff-list.component';

describe('AdminStaffListComponent', () => {
  let component: AdminStaffListComponent;
  let fixture: ComponentFixture<AdminStaffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStaffListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
