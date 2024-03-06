import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { MatTableModule } from '@angular/material/table';
import { AdministratorLayoutComponent } from './administrator-layout/administrator-layout.component';
import { SharedModule } from '../shared/shared.module';
import { BooksComponent } from './books/books.component';
import { LoansComponent } from './loans/loans.component';
import { BooksFormComponent } from './books/books-form/books-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BooksWarningComponent } from './books/books-warning/books-warning.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AdministratorLayoutComponent,
    BooksComponent,
    LoansComponent,
    BooksFormComponent,
    BooksWarningComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AdministratorModule { }
