import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorLayoutComponent } from './administrator-layout/administrator-layout.component';
import { SharedModule } from '../shared/shared.module';
import { BooksComponent } from './books/books.component';


@NgModule({
  declarations: [
    AdministratorLayoutComponent,
    BooksComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedModule
  ]
})
export class AdministratorModule { }
