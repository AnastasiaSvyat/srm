import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionEventComponent } from './description-event.component';

describe('DescriptionEventComponent', () => {
  let component: DescriptionEventComponent;
  let fixture: ComponentFixture<DescriptionEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
