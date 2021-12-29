import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {path: '', component: CategoriesComponent},
  {path: 'all', component: CategoriesComponent, data:{category: 'all'}},
  {path: 'dresses', component: CategoriesComponent, data:{category: 'dresses'}},
  {path: 'jackt&sleeveless', component: CategoriesComponent, data:{category: 'jacket & sleeveless'}},
  {path: 'tops&bodysuits', component: CategoriesComponent, data:{category: 'tops & bodysuits'}},
  {path: 'trousers&shorts', component: CategoriesComponent, data:{category: 'Trousers & Shorts'}},
  {path: 'shirts&blows', component: CategoriesComponent, data:{category: 'shirts & blouses'}},
  {path: 't-shirt&tops', component: CategoriesComponent, data:{category: 't-shirt&tops'}},
  {path: 'outerwear', component: CategoriesComponent, data:{category: 'outer clothing'}},
  {path: 'suits', component: CategoriesComponent, data:{category: 'suits'}},
  {path: 'skirts', component: CategoriesComponent, data:{category: 'skirts'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
