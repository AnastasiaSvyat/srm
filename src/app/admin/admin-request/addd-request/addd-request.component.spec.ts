import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddRequestComponent } from './addd-request.component';

describe('AdddRequestComponent', () => {
  let component: AdddRequestComponent;
  let fixture: ComponentFixture<AdddRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
