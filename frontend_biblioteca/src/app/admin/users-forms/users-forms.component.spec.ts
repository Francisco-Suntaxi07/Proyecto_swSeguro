import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFormsComponent } from './users-forms.component';

describe('UsersFormsComponent', () => {
  let component: UsersFormsComponent;
  let fixture: ComponentFixture<UsersFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersFormsComponent]
    });
    fixture = TestBed.createComponent(UsersFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
