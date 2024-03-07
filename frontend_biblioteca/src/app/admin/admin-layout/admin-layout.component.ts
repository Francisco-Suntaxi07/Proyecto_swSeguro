import { Component, OnInit } from '@angular/core';
import { UsersFormsComponent } from '../users-forms/users-forms.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  userData: { id: string, nombre: string, apellido: string, rol: string } | null = null;

  constructor(
    public dialog: MatDialog,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userService.getUserDataObservable().subscribe(userData => {
      this.userData = userData;
    });
  }

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
