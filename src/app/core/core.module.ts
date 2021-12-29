import { NgModule } from "@angular/core";
import { CoreRoutingModule } from "./core-routing.module";
import { FooterComponent } from "./footer/footer.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { NavigationDirective } from "./navigation/navigation.directive";
import { SharedModule } from "../shared/shared.module";
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { SideNavComponent } from './side-nav/side-nav.component';


@NgModule({
    declarations: [
        NavigationComponent,
        FooterComponent,
        NavigationDirective,
        SideNavComponent,
    ],

    imports: [
        CoreRoutingModule,  
        SharedModule, 
        NzBadgeModule],
    exports: [NavigationComponent, FooterComponent, SideNavComponent]
})
export class CoreModule { }