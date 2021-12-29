import { NgModule } from '@angular/core';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ThanksComponent } from './thanks/thanks.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NewProductsComponent } from './new-products/new-products.component';
import { SaleComponent } from './sale/sale.component';
import { SoonComponent } from './soon/soon.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
    declarations: [
        ProductDetailsComponent,
        ProductDetailsComponent,
        ShoppingCartComponent,
        ShippingComponent,
        ThanksComponent,
        FavoriteComponent,
        NewProductsComponent,
        SaleComponent,
        SoonComponent,
    ],

    imports: [
        ShoppingRoutingModule,
        SharedModule,
        NzToolTipModule
    ],
    exports: []
})

export class ShoppingModule { }