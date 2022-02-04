import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { fadeInOut } from '../shared/animations/animation';
import { LocaleService } from '../shared/services/locale.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: []
})
export class HomeComponent implements OnInit {
  componentName = 'HomeComponent';
  siteDirections

  products:Observable<Product[]>;

  constructor(private route: ActivatedRoute,private productService:ProductService, private localService: LocaleService) { }

  ngOnInit(): void {

    this.products = this.route.data.pipe(map(data=> data.products))
    this.localService.siteDirections.subscribe(directions => this.siteDirections = directions)
    // this.productService.getAllProducts().subscribe((p:Product[]) =>{
    //   p.map(x=>{
    //     console.log(x.category);
        
    //   })
      
    // })
  }

}
