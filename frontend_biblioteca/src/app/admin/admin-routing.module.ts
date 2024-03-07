import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UsersDeleteComponent } from './users-delete/users-delete.component';
import { UsersFormsComponent } from './users-forms/users-forms.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: '', component:AdminLayoutComponent },
  { path: 'users/delete', component:UsersDeleteComponent },
  { path: 'users/forms', component:UsersFormsComponent },
  { path: 'users/list', component:UsersListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
