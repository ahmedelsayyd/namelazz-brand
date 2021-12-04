import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";
import { ArtbookComponent } from './artbook/artbook.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PagesComponent } from "./pages.component";
import { PaymentAndShippingComponent } from './payment-and-shipping/payment-and-shipping.component';
import { ReturnComponent } from './return/return.component';
import { ClothingCareComponent } from './clothing-care/clothing-care.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { WarrantyPeriodComponent } from './warranty-period/warranty-period.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { AgmCoreModule } from "@agm/core";
import { NgxUsefulSwiperModule } from "ngx-useful-swiper";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        PagesComponent,
        ArtbookComponent,
        ContactsComponent,
        PaymentAndShippingComponent,
        ReturnComponent,
        ClothingCareComponent,
        PrivacyComponent,
        PrivacyPolicyComponent,
        PlaceOrderComponent,
        WarrantyPeriodComponent,
        OrderTrackingComponent,
        
    ],

    imports: [
        CommonModule,
        PagesRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAkJSVNNQ7MQLyTnyk7b4maicV7CC3eCPU'
        }),
        NgxUsefulSwiperModule
    ],  
    
    
    exports:[],  

})
export class PagesModule{

}