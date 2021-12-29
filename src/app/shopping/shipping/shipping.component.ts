import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Cart } from 'src/app/shared/models/cart.model';
import { Order } from 'src/app/shared/models/order.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit, OnDestroy{

  cart:Cart
  shippingForm:FormGroup
  orderNumber:number
  
  cartValues={ total:()=> {return this.cart?.shipping + this.cart?.totalPrice} };
  shippingFees={post:1000, courier: 1500, point:1200}

  submitted = false
  uId:string

  ordersNumSubscription: Subscription

  constructor(
      private fb:FormBuilder,
      private cartService:ShoppingCartService,
      private orderService:OrderService,
      private router: Router) { }

  async ngOnInit() {
    
    this.shippingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
      address: ['', Validators.required],
      shippingBy: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });

    
    (await this.cartService.applyCouponDisc(''))
    .pipe(take(1))
    .subscribe(cart => {
      this.cart= cart
    })

    this.uId = JSON.parse(localStorage.getItem('user')).uid;


    this.ordersNumSubscription = this.orderService.getNumOfOrders().subscribe((n:number)=>{
      if(n) this.orderNumber = (n + 1)

      this.orderNumber = 2501
    })
  }

  get f() { return this.shippingForm.controls}


  placeOrder(shippingData){

    this.submitted = true
    if(this.shippingForm.invalid)  return

   
    let order = new Order(shippingData, this.cart, this.uId, this.orderNumber)

    this.orderService.placeOrder(order).then(()=>{
      this.orderService.updateNumOfOrders(this.orderNumber)
      this.shippingForm.reset()
      this.submitted= false
      this.router.navigate(['thanks'])
    })

  }


  ngOnDestroy(){
    if(this.ordersNumSubscription) this.ordersNumSubscription.unsubscribe()
  }

}
