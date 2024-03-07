import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { SharedModule } from '../shared/shared.module';
import { LoansViewComponent } from './loans-view/loans-view.component';


@NgModule({
  declarations: [
    StudentLayoutComponent,
    LoansViewComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
