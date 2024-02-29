import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorLayoutComponent } from './administrator-layout/administrator-layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdministratorLayoutComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedModule
  ]
})
export class AdministratorModule { }
