import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit , OnDestroy{

  relatedProducts: Product[];
  productSub: Subscription

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.productSub = this.productService.getAllProducts() .subscribe((products: Product[])=> {
      this.relatedProducts = products.slice(25, 30)
      
    })
  }

  ngOnDestroy(){
    if(this.productSub) this.productSub.unsubscribe()
  }
}
