import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorLayoutComponent } from './administrator-layout/administrator-layout.component';
import { BooksComponent } from './books/books.component';
import { LoansComponent } from './loans/loans.component';
import { BooksFormComponent } from './books/books-form/books-form.component';
import { BooksWarningComponent } from './books/books-warning/books-warning.component';

const routes: Routes = [
  { path: '', component:AdministratorLayoutComponent },
  { path: 'books', component: BooksComponent},
  { path: 'books/form', component: BooksFormComponent},
  { path: 'books/warning', component: BooksWarningComponent},
  { path: 'loans', component: LoansComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
