import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgUserComponent } from './msg-user.component';

describe('MsgUserComponent', () => {
  let component: MsgUserComponent;
  let fixture: ComponentFixture<MsgUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
