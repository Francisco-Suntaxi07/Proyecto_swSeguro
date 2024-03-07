import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BooksFormComponent } from '../books/books-form/books-form.component';
import { LoansFormComponent } from '../loans/loans-form/loans-form.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-administrator-layout',
  templateUrl: './administrator-layout.component.html',
  styleUrls: ['./administrator-layout.component.scss']
})
export class AdministratorLayoutComponent implements OnInit {

  displayBooks: boolean = false;
  displayLoans: boolean = false;
  userName: string | null = null;

  constructor(
    public dialog: MatDialog,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.subscribeToUserData();
  }

  goToBooks() {
    this.displayBooks = true;
    this.displayLoans = false;
  }

  goToLoans() {
    this.displayLoans = true;
    this.displayBooks = false;
  }

  openFormBooks(): void {
    const dialogRef = this.dialog.open(BooksFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  openFormLoans() {
    const dialogRef = this.dialog.open(LoansFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  private subscribeToUserData(): void {
    this.userService.getUserDataObservable().subscribe(userData => {
      if (userData) {
        this.userName = `${userData.nombre} ${userData.apellido}`;
      } else {
        this.userName = null;
      }
    });
  }
}

