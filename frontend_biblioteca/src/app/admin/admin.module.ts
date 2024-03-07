import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SharedModule } from '../shared/shared.module';
import { UsersFormsComponent } from './users-forms/users-forms.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UsersDeleteComponent } from './users-delete/users-delete.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    UsersFormsComponent,
    UsersDeleteComponent,
    UsersListComponent
  ],
  imports: [
    MatSelectModule,
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class AdminModule { }
