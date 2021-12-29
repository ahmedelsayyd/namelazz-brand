import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { BestsellersComponent } from './bestsellers/bestsellers.component';
import { CatalogComponent } from './catalog/catalog.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home.component';
import { LookbookComponent } from './lookbook/lookbook.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BestsellersComponent,
    AboutUsComponent,
    CatalogComponent,
    LookbookComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,

  ],
  exports: []
})
export class HomeModule { }
