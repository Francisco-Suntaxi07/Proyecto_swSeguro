import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UsersDeleteComponent } from './users-delete/users-delete.component';
import { UsersFormsComponent } from './users-forms/users-forms.component';
import { UsersListComponent } from './users-list/users-list.component';
import { guardsGuard } from '../security/guards.guard';

const routes: Routes = [
  { path: '', canMatch: [guardsGuard], component: AdminLayoutComponent },
  { path: 'users/delete', canMatch: [guardsGuard], component: UsersDeleteComponent },
  { path: 'users/forms', canMatch: [guardsGuard], component: UsersFormsComponent },
  { path: 'users/list', canMatch: [guardsGuard], component: UsersListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
