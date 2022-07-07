import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLogTimeDetailsComponent } from './admin-log-time-details.component';

describe('AdminLogTimeDetailsComponent', () => {
  let component: AdminLogTimeDetailsComponent;
  let fixture: ComponentFixture<AdminLogTimeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLogTimeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLogTimeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
