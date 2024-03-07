import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorLayoutComponent } from './administrator-layout/administrator-layout.component';
import { BooksComponent } from './books/books.component';
import { LoansComponent } from './loans/loans.component';
import { BooksFormComponent } from './books/books-form/books-form.component';
import { BooksWarningComponent } from './books/books-warning/books-warning.component';
import { LoansFormComponent } from './loans/loans-form/loans-form.component';
import { LoansWarningComponent } from './loans/loans-warning/loans-warning.component';
import { guardsGuard } from '../security/guards.guard';

const routes: Routes = [
  { path: '', canMatch: [guardsGuard], component: AdministratorLayoutComponent },
  { path: 'books', canMatch: [guardsGuard], component: BooksComponent },
  { path: 'books/form', canMatch: [guardsGuard], component: BooksFormComponent },
  { path: 'books/warning', canMatch: [guardsGuard], component: BooksWarningComponent },
  { path: 'loans', canMatch: [guardsGuard], component: LoansComponent },
  { path: 'loans/form', canMatch: [guardsGuard], component: LoansFormComponent },
  { path: 'loans/warning', canMatch: [guardsGuard], component: LoansWarningComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
