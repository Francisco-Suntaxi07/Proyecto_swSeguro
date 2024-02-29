import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    StudentLayoutComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
