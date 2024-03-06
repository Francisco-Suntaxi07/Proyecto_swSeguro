import { Component } from '@angular/core';

@Component({
  selector: 'app-administrator-layout',
  templateUrl: './administrator-layout.component.html',
  styleUrls: ['./administrator-layout.component.scss']
})
export class AdministratorLayoutComponent {

  displayBooks: boolean = false;
  displayLoans: boolean = false;

  goToBooks() {
    this.displayBooks = true;
  }

  goToLoans() {
    this.displayLoans = true;
  }
}

