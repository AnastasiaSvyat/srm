import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLogTimeComponent } from './admin-log-time.component';

describe('AdminLogTimeComponent', () => {
  let component: AdminLogTimeComponent;
  let fixture: ComponentFixture<AdminLogTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLogTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLogTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
