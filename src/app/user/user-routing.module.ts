import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { AccountComponent } from "./account/account.component";
import { OrdersComponent } from "./orders/orders.component";
import { SubscriptionsComponent } from "./subscriptions/subscriptions.component";
import { UserComponent } from "./user.component";



const routes: Routes = [
    {
        path: '', component: UserComponent, canActivate: [AuthGuard], children: [
            { path: 'account', component: AccountComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'subscriptions', component: SubscriptionsComponent },
 
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }