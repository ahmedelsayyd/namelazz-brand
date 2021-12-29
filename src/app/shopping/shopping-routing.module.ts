
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FavoriteComponent } from "./favorite/favorite.component";
import { NewProductsComponent } from "./new-products/new-products.component";

import { ProductDetailsComponent } from "./product-details/product-details.component";
import { SaleComponent } from "./sale/sale.component";
import { ShippingComponent } from "./shipping/shipping.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { SoonComponent } from "./soon/soon.component";
import { ThanksComponent } from "./thanks/thanks.component";




const routes: Routes = [
    {path: 'new', component: NewProductsComponent},
    {path: 'sale', component: SaleComponent},
    {path: 'soon', component: SoonComponent},

    {path: 'product-details', component: ProductDetailsComponent },
    {path: 'favorites', component: FavoriteComponent},
    {path: 'cart', component: ShoppingCartComponent},
    {path: 'cart/shipping', component: ShippingComponent},
    {path: 'thanks', component: ThanksComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ShoppingRoutingModule { }