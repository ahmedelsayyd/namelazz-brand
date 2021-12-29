import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { LocaleService } from '../../services/locale.service';
import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
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
    this.CartService.addOrUpdateToCart(product, {quantity: 1}).then(()=>{

      this.productService.editProduct(product.id, {inCart: true})
    })
  } 


  checkOut(){
    this.router.navigate(['cart'])
  }

  toProductDetails(productId){
    this.router.navigate(['/product-details'], {queryParams: {id: productId}})
  }

}
