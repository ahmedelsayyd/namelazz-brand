import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './dashboard/products/products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from '../icons-provider.module';
import { AddProductComponent } from './dashboard/add-product/add-product.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { SharedModule } from '../shared/shared.module';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AddAttributeComponent } from './dashboard/add-attribute/add-attribute.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';




@NgModule({
  declarations: [
    ProductsComponent,
    DashboardComponent,
    AddProductComponent,
    OrdersComponent,
    AddAttributeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    SharedModule,
    NzUploadModule,
    NzFormModule,
    AngularFireStorageModule,
    NzInputModule,
    NzTagModule,
    NzTableModule,
    NzDividerModule,
    AngularFirestoreModule,
    NzSelectModule,
    ScrollingModule,
    DragDropModule,
    NzRadioModule,
    NzPopconfirmModule
  ],
  providers: []
})
export class AdminModule { }
