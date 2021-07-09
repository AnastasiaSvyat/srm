import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgAdminComponent } from './msg-admin.component';

describe('MsgAdminComponent', () => {
  let component: MsgAdminComponent;
  let fixture: ComponentFixture<MsgAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
