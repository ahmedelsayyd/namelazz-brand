import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut } from '../../animations/animation';
import { Product } from '../../models/product.model';
import { LocaleService } from '../../services/locale.service';
import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [
    fadeInOut
  ]
})
export class ProductCardComponent implements OnInit {

  @Input() loadedComponent
  @Input() product:Product

  @Input() catalogProduct

  
  constructor(
    private router:Router ,
    private CartService:ShoppingCartService,
    private productService:ProductService, 
    public localService: LocaleService) { }

  ngOnInit(): void {
    
 
  }

  addToCart(product:Product){
    this.CartService.addOrUpdateToCart({...product, 'selectedSize': product.sizes[1],'selectedColor': ''}, {quantity: 1}).then(()=>{

      // this.productService.editProduct(product.id, {inCart: true})
    })
  } 

  isInCart(productId) : boolean{
    
    const productsInCartMap = new Map<string, boolean>(JSON.parse(localStorage.getItem('productsInCart')))
    return productsInCartMap.get(productId)
  }

  checkOut(){
    this.router.navigate(['cart'])
  }

  toProductDetails(productId){
    this.router.navigate(['/product-details'], {queryParams: {id: productId}}).then(()=> window.scrollTo(0, 0))
  }

}
