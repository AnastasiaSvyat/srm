import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStaffListComponent } from './user-staff-list.component';

describe('UserStaffListComponent', () => {
  let component: UserStaffListComponent;
  let fixture: ComponentFixture<UserStaffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStaffListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
