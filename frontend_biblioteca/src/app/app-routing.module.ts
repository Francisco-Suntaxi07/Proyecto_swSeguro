import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { LoginModule } from './login/login.module';

const routes: Routes = [
  //{ path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '', component: SignInComponent, loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }


  //{path: '',   redirectTo: '/sign-in', pathMatch: 'full' },
  //{path: 'sign-in', component: SignInComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
