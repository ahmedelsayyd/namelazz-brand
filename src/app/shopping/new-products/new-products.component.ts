import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss']
})
export class NewProductsComponent implements OnInit {

  saleProducts:Product[]
  constructor(private productService:ProductService) { }

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe(products =>{
      console.log(products);
      this.saleProducts= products.slice(15)
      
    })
  }
}
