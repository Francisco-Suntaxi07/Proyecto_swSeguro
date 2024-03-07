import { Component } from '@angular/core';
import { UsersFormsComponent } from '../users-forms/users-forms.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';
import { UsersListComponent } from '../users-list/users-list.component';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  constructor(
    public dialog: MatDialog
  ){}
  deleteUser(): void {
    const dialogRef = this.dialog.open(UsersDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  createUser(): void {
    const dialogRef = this.dialog.open(UsersFormsComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  getUsers(): void {
    const dialogRef = this.dialog.open(UsersListComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
