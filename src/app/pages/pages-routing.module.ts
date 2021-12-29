import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LookbookComponent } from "../home/lookbook/lookbook.component";
import { ClothingCareComponent } from "./clothing-care/clothing-care.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { OrderTrackingComponent } from "./order-tracking/order-tracking.component";
import { PagesComponent } from "./pages.component";
import { PaymentAndShippingComponent } from "./payment-and-shipping/payment-and-shipping.component";
import { PlaceOrderComponent } from "./place-order/place-order.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { ReturnComponent } from "./return/return.component";
import { WarrantyPeriodComponent } from "./warranty-period/warranty-period.component";



const routes:Routes = [
    {path: '', component: PagesComponent, children: [
        {path: 'delivery', component: PaymentAndShippingComponent},
        {path: 'return', component: ReturnComponent},
        {path: 'clothing-care', component: ClothingCareComponent},
        {path: 'order-tracking', component: OrderTrackingComponent},
        {path: 'how-to-place-order', component: PlaceOrderComponent},
        {path: 'policy', component: PrivacyPolicyComponent},
        {path: 'privacy', component: PrivacyComponent},
        {path: 'warranty-period', component: WarrantyPeriodComponent},
    ]},
    {path: 'artbook' , component: LookbookComponent},
    {path: 'contacts', component: ContactsComponent},
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule{

}