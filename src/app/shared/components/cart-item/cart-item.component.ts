import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { backOutTrigger } from '../../animations/animation';
import { Product } from '../../models/product.model';
import { ShoppingCartItem } from '../../models/shopping-cart-item.model';
import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  animations: [backOutTrigger]
})
export class CartItemComponent implements OnInit, OnDestroy {
@Input() cartItem:ShoppingCartItem
qtyArr=[1 ,2 ,3 ,4 ,5 ,6 ]
selectedSize:string =''
selectedQty:number =0;
product: Product
productSubscription: Subscription;




  constructor(private cartService:ShoppingCartService, private productService:ProductService) { }

  ngOnInit(): void {

     this.productService.getProduct(this.cartItem.id).subscribe(p=>{
      this.product = p
      
    })

    if(this.product){
      this.setSize(this.cartItem.size[0])
      this.setQty(1)
    }
  }

  productNameSplit(name, separator, limit, status){
    return this.productService.splitString(name, separator,limit, status)
  }

  
  setSize(size){
    this.selectedSize = size;
    this.cartService.addOrUpdateToCart(this.product ,{size: size})
  }


  setQty(qty){
    this.selectedQty = qty
    this.cartService.addOrUpdateToCart(this.product ,{quantity: qty})
  }


  deleteItem(id){
    this.cartService.removeFromCart(this.cartItem.id)
    this.productService.editProduct(this.product.id, {inCart: false})
  }

  
  ngOnDestroy(){
    if(this.productSubscription) this.productSubscription.unsubscribe()
  }
  
}
