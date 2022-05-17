import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOpenMenuComponentComponent } from './admin-open-menu-component.component';

describe('AdminOpenMenuComponentComponent', () => {
  let component: AdminOpenMenuComponentComponent;
  let fixture: ComponentFixture<AdminOpenMenuComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOpenMenuComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOpenMenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
