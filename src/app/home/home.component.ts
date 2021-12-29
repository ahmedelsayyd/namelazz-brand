import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { LocaleService } from '../shared/services/locale.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  siteDirections

  products:Observable<Product[]>;

  constructor(private productService:ProductService, private localService: LocaleService) { }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts()
    this.localService.siteDirections.subscribe(directions => this.siteDirections = directions)
    // this.productService.getAllProducts().subscribe((p:Product[]) =>{
    //   p.map(x=>{
    //     console.log(x.category);
        
    //   })
      
    // })
  }

}
