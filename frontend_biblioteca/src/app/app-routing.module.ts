import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { guardsGuard } from './security/guards.guard'
import { roleGuard } from './security/role.guard';
import { ErrorsComponent } from './errors/errors.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'admin', canMatch: [guardsGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'administrador', canMatch: [guardsGuard],
    loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule)
  },
  {
    path: 'estudiante', canMatch: [guardsGuard],
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
  },
  { path: "**", component: ErrorsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
