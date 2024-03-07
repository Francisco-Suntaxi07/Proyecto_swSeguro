import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { LoansViewComponent } from './loans-view/loans-view.component';
import { guardsGuard } from '../security/guards.guard';

const routes: Routes = [
  { path: '', canMatch: [guardsGuard], component: StudentLayoutComponent },
  { path: 'loans-view', canMatch: [guardsGuard], component: LoansViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
