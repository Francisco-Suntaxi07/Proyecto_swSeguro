import { Component } from '@angular/core';
import { BooksFormComponent } from '../books/books-form/books-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-administrator-layout',
  templateUrl: './administrator-layout.component.html',
  styleUrls: ['./administrator-layout.component.scss']
})
export class AdministratorLayoutComponent {

  displayBooks: boolean = false;
  displayLoans: boolean = false;

  constructor(
    public dialog: MatDialog,
  ) { }

  goToBooks() {
    this.displayBooks = true;
    this.displayLoans = false;
  }

  goToLoans() {
    this.displayLoans = true;
    this.displayBooks = false;
  }

  openForm(): void {
    const dialogRef = this.dialog.open(BooksFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }
}

