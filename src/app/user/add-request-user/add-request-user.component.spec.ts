import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestUserComponent } from './add-request-user.component';

describe('AddRequestUserComponent', () => {
  let component: AddRequestUserComponent;
  let fixture: ComponentFixture<AddRequestUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRequestUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
