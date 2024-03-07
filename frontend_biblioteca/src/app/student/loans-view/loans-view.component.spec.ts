import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansViewComponent } from './loans-view.component';

describe('LoansViewComponent', () => {
  let component: LoansViewComponent;
  let fixture: ComponentFixture<LoansViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoansViewComponent]
    });
    fixture = TestBed.createComponent(LoansViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
