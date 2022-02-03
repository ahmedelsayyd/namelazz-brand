import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { ShoppingCartItem } from '../models/shopping-cart-item.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  constructor(private fs: AngularFirestore, private productService: ProductService) { }


  /// Creation of cart ////////////////////
  createCart(){
    return this.fs.collection('/shopping-cart').add({ dateCreated: new Date().getTime()})
  }
  
  async getOrCreatCartId(){
    let id = localStorage.getItem('cartId')

    if(id) return id

    let result= await this.createCart()
    localStorage.setItem('cartId', result.id)
    return result.id
  }



  // Return cart And Cart Items /////////////////
  async getCart(){
    let cartId = await this.getOrCreatCartId();
    return this.fs.collection<ShoppingCartItem>(`shopping-cart/${cartId}/items`)
          .valueChanges()
          .pipe(map(items=> {            
            // this.cartItemsCount.next(items.length)
            return new Cart(items)
          }))
  }

  getCartItem(cartId, productId){
    return this.fs.doc(`shopping-cart/${cartId}/items/${productId}`)
  }



  // Add && update && remove Items To Cart//////////////////////////

  async addOrUpdateToCart(product, updatedData){
    
    let cartId = await this.getOrCreatCartId()
    this.UpdateCart(cartId, product, updatedData)
  }



  async removeFromCart(productId){
    const cartId= await this.getOrCreatCartId()
    this.getCartItem(cartId, productId).delete()

    this.updateUiState(productId)
  }



  private UpdateCart(CartId, product, updatedData){
    
    let cartItem = this.getCartItem(CartId, product.id)
    
    cartItem.valueChanges().pipe(take(1)).subscribe((item) =>{

      //let quantity = (item.quantity || 0) + 1;
      if(item){
          cartItem.update({...updatedData});

      }else{
        
        let item ={
          id: product.id,
          name: product.name,
          price: product.price,
          size: product.sizes,
          color: product.colors,
          selectedSize: product.selectedSize,
          selectedColor: product.selectedColor,
          imageUrl: product.images[0],
          quantity: updatedData.quantity
        };
        
        cartItem.set(item)
        this.updateUiState(product.id)

      }
    })
    
  }

  async clearCart() {
    let cartId = await this.getOrCreatCartId();

    (await this.fs.collection(`/shopping-cart/`).doc(`${cartId}`).collection('items').ref.get())
    .forEach(el=>{
      // this.productService.editProduct(el.id, {inCart: false})
      el.ref.delete()
      //this.fs.doc(`/shopping-cart/${cartId}/items/${el.id}`).delete()
    })
    
    localStorage.removeItem('productsInCart');
  }


  updateUiState(productId?){
  // handel ADD TO CART Button state
  const productsInCartMap = new Map(JSON.parse(localStorage.getItem('productsInCart')))
  if(productId){
    const inCart = productsInCartMap.get(productId)

    if(inCart) productsInCartMap.delete(productId)
    else productsInCartMap.set(productId, true)
    }
    localStorage.setItem('productsInCart', JSON.stringify(Array.from(productsInCartMap.entries())))
  }



  async applyCouponDisc(code){
  
    return (await this.getCart()).pipe(map((cart)=>{
      return new Cart(cart.items, 15)
    }))
  }

}
