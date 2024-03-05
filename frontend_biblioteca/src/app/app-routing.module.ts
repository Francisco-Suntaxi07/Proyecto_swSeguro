import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdministratorLayoutComponent } from './administrator/administrator-layout/administrator-layout.component';
import { StudentLayoutComponent } from './student/student-layout/student-layout.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'administrador', loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule) },
  { path: 'estudiante', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: '**', loadComponent: () => import('./errors/errors.component').then(comp => comp.ErrorsComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
