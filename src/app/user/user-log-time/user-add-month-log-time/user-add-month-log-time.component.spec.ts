import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddMonthLogTimeComponent } from './user-add-month-log-time.component';

describe('UserAddMonthLogTimeComponent', () => {
  let component: UserAddMonthLogTimeComponent;
  let fixture: ComponentFixture<UserAddMonthLogTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddMonthLogTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddMonthLogTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
