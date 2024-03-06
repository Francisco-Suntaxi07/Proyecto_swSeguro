import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksWarningComponent } from './books-warning.component';

describe('BooksWarningComponent', () => {
  let component: BooksWarningComponent;
  let fixture: ComponentFixture<BooksWarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksWarningComponent]
    });
    fixture = TestBed.createComponent(BooksWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
