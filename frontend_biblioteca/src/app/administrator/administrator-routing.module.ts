import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorLayoutComponent } from './administrator-layout/administrator-layout.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  { path: '', component:AdministratorLayoutComponent },
  { path: 'books', component: BooksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
