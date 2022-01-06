import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOpenMenuComponentComponent } from './user-open-menu-component.component';

describe('UserOpenMenuComponentComponent', () => {
  let component: UserOpenMenuComponentComponent;
  let fixture: ComponentFixture<UserOpenMenuComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOpenMenuComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOpenMenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
