import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { CategotiesComponent } from './categoties/categoties.component';
import { ProductFiltersComponent } from './categoties/product-filters/product-filters.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ThanksComponent } from './thanks/thanks.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NewProductsComponent } from './new-products/new-products.component';
import { SaleComponent } from './sale/sale.component';
import { SoonComponent } from './soon/soon.component';
import { NouisliderModule } from 'ng2-nouislider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
    declarations: [
        ProductDetailsComponent,
        CategotiesComponent,
        ProductFiltersComponent,
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
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        SharedModule,
        NouisliderModule,
        NzToolTipModule
    ],
    exports: []
})

export class ShoppingModule { }