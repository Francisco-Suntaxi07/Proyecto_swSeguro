import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { LoansViewComponent } from './loans-view/loans-view.component';

const routes: Routes = [
  { path: '', component: StudentLayoutComponent },
  { path: 'loans-view', component: LoansViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
