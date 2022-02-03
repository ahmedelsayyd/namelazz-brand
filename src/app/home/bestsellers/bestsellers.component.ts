import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {  distinctUntilChanged, switchMap, take} from 'rxjs/operators';
import { PaginationService } from 'src/app/shared/components/pagination/pagination.service';
import { Product } from 'src/app/shared/models/product.model';
import { MediaService } from 'src/app/shared/services/media.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'bestsellers',
  templateUrl: './bestsellers.component.html',
  styleUrls: ['./bestsellers.component.scss']
})
export class BestsellersComponent implements OnInit, OnDestroy {
  activeMediaBreakpoint:string
  currentScreenSize: string;


  @Input() siteDirections
  @Input() products:Observable<Product[]>
  @Input() loadedComponent;
  filteredProducts: Product[]=[]
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  startIndex
  endIndex
  pagData
  pageSize:number

  layoutChanges$: Observable<string>
  productSub:Subscription


  constructor(private PaginationService: PaginationService, private mediaService: MediaService, private productService:ProductService) { 
    this.layoutChanges$ = this.mediaService.layOutChangesListner(['(max-width: 575.98px)', '(min-width: 576px) and (max-width: 768px)'])
  }

  ngOnInit(): void {

    this.productSub = this.productService.getAllProducts().pipe(take(1))
    .pipe(switchMap((p) => {
      this.filteredProducts = p.slice(0,9)

      return combineLatest([
        this.PaginationService.currentPageDetails, 
        this.layoutChanges$.pipe(distinctUntilChanged())]);

    }))
    .subscribe(([data, screenSize]) =>{
    
        if(screenSize){

          switch (screenSize) {
            
            case 'sm':
              this.pageSize = 3
              this.currentScreenSize = 'sm'
              break;
  
            case 'xs':
              this.pageSize = 2
              this.currentScreenSize = 'xs'
              
              break;
              
              default:
                break;
                
              }
              
              this.pagData = data
              this.startIndex = this.pagData.startIndex;
              this.endIndex = this.pagData.endIndex;
            return;
        }



        this.pageSize = 3
        this.pagData = data
        this.startIndex = this.pagData.startIndex;
        this.endIndex = this.pagData.endIndex;
    }) 


  }


  ngOnDestroy(){
    if(this.productSub) this.productSub.unsubscribe()
  }

}
