import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProductCardComponent } from './components/product-card/product-card.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationService } from "./components/pagination/pagination.service";
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MycurrencyPipe } from "./pipes/custom.currencypipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TrackFocusDirective } from "./directives/track-focus.directive";
import { NzIconModule } from "ng-zorro-antd/icon";
import { DraggingDirective } from './directives/dragging.directive';
import { SortByPipe } from './pipes/sort-by.pipe';




@NgModule({
    declarations: [ProductCardComponent, 
        PaginationComponent, 
        CartItemComponent, 
        MycurrencyPipe,
        TrackFocusDirective,
        DraggingDirective,
        SortByPipe],

    imports: [
        CommonModule, 
        NzDropDownModule,
        NzSelectModule,
        FormsModule, 
         ReactiveFormsModule,
         NzIconModule,
    ],


    exports: [
        ProductCardComponent, 
        PaginationComponent, 
        CartItemComponent,
        TrackFocusDirective,
        MycurrencyPipe,
        CommonModule,
        NzDropDownModule,
        NzSelectModule, 
        FormsModule, 
        ReactiveFormsModule,
        NzIconModule,
        DraggingDirective

    ],
    providers: [PaginationService],
})
export class SharedModule { }