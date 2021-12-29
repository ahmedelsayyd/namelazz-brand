import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAttributeComponent } from './dashboard/add-attribute/add-attribute.component';
import { AddProductComponent } from './dashboard/add-product/add-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './dashboard/products/products.component';



const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'products/:id/edit', component: AddProductComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'add-attribute', component: AddAttributeComponent },
      { path: 'orders', component: AddProductComponent }

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
