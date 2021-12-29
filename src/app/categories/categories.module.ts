import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { NouisliderModule } from 'ng2-nouislider';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CategoriesComponent,

  ],
  imports: [
    CategoriesRoutingModule,
    NouisliderModule,
    SharedModule

  ]
})
export class CategoriesModule { }
