import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductService } from '../shared/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<any> {

  constructor(private productService: ProductService){}
  // resolve(): Observable<Product[]> {
  //   return this.productService.getAllProducts();
  // }

    resolve(): Observable<any> {
    return of('').pipe(delay(1000))
  }
}
