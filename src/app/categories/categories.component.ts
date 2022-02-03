import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DashboardService } from 'src/app/admin/dashboard.service';
import { fadeInOut, toggoleDropdowntrigger } from 'src/app/shared/animations/animation';
import { PaginationData, PaginationService } from 'src/app/shared/components/pagination/pagination.service';
import { Product } from 'src/app/shared/models/product.model';
import { FilterService } from 'src/app/shared/services/filter.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { MediaService } from '../shared/services/media.service';

@Component({
  selector: 'app-categoties',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: [
    toggoleDropdowntrigger,
  ]
})
export class CategoriesComponent implements OnInit, OnDestroy {

  @ViewChild('filterModal') filterModal:ElementRef;
  @ViewChild('sortModal') sortModal:ElementRef;
  @ViewChild('categoriesModal') categoriesModal:ElementRef;

  products:Product[]
  filteredProducts: Product[]
  displayedProducts: Product[]
  pageSize: number = 9
  totalItems = new Subject<number>()

  routeData:any

  categories=['All', 'Dresses', 'Shirts & Blows', 'Outer Wear', 'Jackt & sleeveless', 'Tops & bodysuits', 'Suits', 'T-shirt & tops', 'Trousers & shorts', 'Skirts']
  visibleCategories = []
  hiddenCategories = []

  productAttrs ={
    colors:[
      {code: '#000000', name: 'black'},
      {code:'#ffffff', name: 'white'},
      {code:'#935116', name: 'brown'},
      {code:'#EDBB99', name: 'rose'},
      {code:'#85C1E9', name: 'sky blue'},
      {code:'#d7c797', name: 'beig'},
      {code:'#C0C0C0', name: 'gray'},
      {code:'#E3BE00', name: 'golden'}],
    sizes: [],
    materials:['lycra','eco-leather','cotton','knitted wear',]
  }



  filters={
    filterBy: [
      'All', 'Dresses', 'Shirts & Blows',
      'Outer Wear', 'Jackt &sleeveless',
      'Tops & bodysweets', 'T-shirt & tops', 
      'Trousers & shorts', 'Skirts'],
    sortBy: [
      {name:'Descending price',order:'desc', query:'-price'}, 
      {name:'Ascending price',order:'asce', query:'price'}, 
      {name:'New items first',order:'new', query:'is_new'}, 
    ]
  }


  // PRICE Filter
  priceCurrency = "kr";
  minPrice = 0;
  maxPrice = 20000;
  priceRange 


  nouisliderConfig={
    connect: true,
    start: [0, 20000],
    step: 1,
    range: {
      min: 0,
      max: 20000
    },
    behaviour: 'drag',
  };

  // ===============================
  // Products Filters 
  // ===============================
  filterMenues={
    color : {isOpen: false},
    price : {isOpen: false},
    size : {isOpen: false},
    material : {isOpen: false},
  }
  toggoleFilterDropdown:boolean= false
  toggoleSortDropdown:boolean= false
  toggoleCategoriesDropdown: boolean = false

  selectedFiltersString$: Observable<string>
  selectedSortString$: Observable<string>
  priceRang$ = new BehaviorSubject<number[]>([0,20000])

  productsSub:Subscription
  attrSub:Subscription
  filterMenuSub:Subscription
  pagSub:Subscription



  constructor(
    private productService:ProductService, 
    private route: ActivatedRoute,
    private dashboardService:DashboardService,
    private PaginationService: PaginationService,
    private filterService: FilterService,
    private mediaService: MediaService,
    private zone: NgZone,
    @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {

   
    // GET ALL PRODUCTS
    this.productsSub = this.productService.getAllProducts()
    .pipe(
      switchMap((products: Product[])=>{
      this.products = products
      return combineLatest([this.route.data, this.route.queryParams, this.priceRang$, this.PaginationService.currentPageDetails])

      }),distinctUntilChanged())
    .subscribe(([data, params, priceRang, pagData]: [Data,Params, number[] ,PaginationData])=>{
      
      
      this.filteredProducts = this.filterService.filter(this.products, data.category, params, priceRang)
      this.displayedProducts = this.filteredProducts.slice(pagData.startIndex, pagData.endIndex + 1)

    })



    this.selectedFiltersString$ = this.filterService.getSelectedFiltersString()
    this.selectedSortString$ = this.filterService.getSelectedSortString()
    
    
    // GET PRODUCT ATTRS
    this.attrSub = this.dashboardService.getAttributes().subscribe((attrs) =>{
      attrs.map(attr =>{
        if(attr.attrName ==='size') this.productAttrs.sizes =attr.variables
      })
      
    })

 


    this.setupClickListener();

    // this.router.events
    // .pipe(
    //   filter(e => e instanceof NavigationEnd),
    //   map(()=> this.route.snapshot))
    // .subscribe((route:ActivatedRouteSnapshot)=>{


    //   if(cat){
        
    //     if(cat === 'all') { this.filteredProducts = this.products; return}

    //     this.routeData = route.data;
    //     this.filteredProducts = this.products.filter(p => p.category === this.routeData.category)
    //   }else{
    //     this.filteredProducts = this.products
    //   }

    // })


    this.mediaService.layOutChangesListner(['(max-width: 390px)','(max-width: 575.98px)', '(min-width: 576px) and (max-width: 768px)'])
    .subscribe(screenSize =>{
      switch (screenSize) {
        case 'sm':
          this.visibleCategories = this.categories.slice(0, 5)
          this.hiddenCategories = this.categories.slice(5)
          break;
        
        case 'xs':
          this.visibleCategories = this.categories.slice(0, 4)
          this.hiddenCategories = this.categories.slice(4)

        break;

        case 'xxs':
          this.visibleCategories = this.categories.slice(0, 3)
          this.hiddenCategories = this.categories.slice(3)

        break;

        default:
          this.visibleCategories = this.categories
          break;
      }
    })
    
  }

  getCategoryRoute(category: string){

      const cleanStr = category.toLocaleLowerCase().trim().replace(/\s+/g,'')
      return ['/catalog/', cleanStr]
  }

  // click Listener for Dropdowns Toggole
  private setupClickListener() {
    this.zone.runOutsideAngular(() => {

      this.filterMenuSub = fromEvent(this.document, "click").subscribe((e:MouseEvent) => {

        if (!this.filterModal.nativeElement.contains(e.target) && this.toggoleFilterDropdown) {
          
          this.zone.run(() => {
            this.toggoleFilterDropdown = false;
          });
          
        }else if(!this.sortModal.nativeElement.contains(e.target) && this.toggoleSortDropdown){
          this.zone.run(() => {
            this.toggoleSortDropdown = false;
          });
          
        }else if(!this.categoriesModal.nativeElement.contains(e.target) && this.toggoleCategoriesDropdown){
          this.zone.run(() => {
            this.toggoleCategoriesDropdown = false;
          });
        }

        
      });
    })
  }


  
  // ===============================
  // Products Filters Functionality
  // ===============================

  onFilterChange(filter, value, index){
    this.filterService.onFilterChange(filter, value, index)
  }


  priceChange(value: any) {
    if (value) {
      
      this.minPrice = value[0]
      this.maxPrice = value[1]
      this.priceRang$.next(value)
    }
  }


  changeMenuStatus(menuName, e){
    e.stopPropagation();
    this.filterMenues[menuName].isOpen = !this.filterMenues[menuName].isOpen
  }

  ngOnDestroy(){
    if(this.productsSub) this.productsSub.unsubscribe()
    if(this.attrSub) this.attrSub.unsubscribe()
    if(this.filterMenuSub) this.filterMenuSub.unsubscribe()
    if(this.pagSub) this.pagSub.unsubscribe()
  }

}
