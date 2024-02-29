import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorLayoutComponent } from './administrator-layout.component';

describe('AdministratorLayoutComponent', () => {
  let component: AdministratorLayoutComponent;
  let fixture: ComponentFixture<AdministratorLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorLayoutComponent]
    });
    fixture = TestBed.createComponent(AdministratorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
