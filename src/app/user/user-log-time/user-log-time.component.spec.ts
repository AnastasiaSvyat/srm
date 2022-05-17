import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogTimeComponent } from './user-log-time.component';

describe('UserLogTimeComponent', () => {
  let component: UserLogTimeComponent;
  let fixture: ComponentFixture<UserLogTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLogTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLogTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
