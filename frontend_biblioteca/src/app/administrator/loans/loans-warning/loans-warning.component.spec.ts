import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansWarningComponent } from './loans-warning.component';

describe('LoansWarningComponent', () => {
  let component: LoansWarningComponent;
  let fixture: ComponentFixture<LoansWarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoansWarningComponent]
    });
    fixture = TestBed.createComponent(LoansWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
