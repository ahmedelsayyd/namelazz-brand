import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filteredProducts: Product[]

  filteredColors = new Map();
  filteredSizes = new Map();
  filteredMaterials = new Map();
  sortedBy = new Map()

  selectedFilters = new Set();
  selectedSort: string
  selectedFiltersString$ = new Subject<string>()
  selectedSortString$= new Subject<string>()

  constructor(   
    private route: ActivatedRoute,
    private router: Router,) { }

  
  onFilterChange(filter,value, index){
    let sizeFilter
    let colorFilter
    let materialFilter

    switch (filter) {

      case 'color':
        {
          if(this.filteredColors.has(index)){
            this.filteredColors.delete(index)

            colorFilter =this.joinQueryParamsFilter(this.filteredColors);
              this.notifyFilterChange('size', colorFilter)
              
            if(!(this.filteredColors.size >= 1)) this.selectedFilters.delete('color')
            return;
          }
          this.filteredColors.set(index, value);
          colorFilter =this.joinQueryParamsFilter(this.filteredColors);
          this.notifyFilterChange('base_color', colorFilter)
      
      
          if(this.filteredColors.size > 0){
            this.updateSelectedFilters('color')
          }
          
          break;
        }
    

      case 'size':
          {
            if(this.filteredSizes.has(index)){
              this.filteredSizes.delete(index)
        
              sizeFilter =this.joinQueryParamsFilter(this.filteredSizes);
              this.notifyFilterChange('size', sizeFilter)
        
              if(!(this.filteredSizes.size >= 1)) this.selectedFilters.delete('size')
              return;
            }

            this.filteredSizes.set(index, value);
            sizeFilter =this.joinQueryParamsFilter(this.filteredSizes);
            this.notifyFilterChange('size', sizeFilter)
        
        
            if(this.filteredSizes.size > 0){
              this.updateSelectedFilters('size')
            }
            break; 
          }


      case 'material':
        {
          if(this.filteredMaterials.has(index)){
            this.filteredMaterials.delete(index)

            materialFilter =this.joinQueryParamsFilter(this.filteredMaterials);
            this.notifyFilterChange('size', materialFilter)
            
            if(!(this.filteredMaterials.size >= 1)) this.selectedFilters.delete('material')
            return;
          }
          this.filteredMaterials.set(index, value);
          materialFilter =this.joinQueryParamsFilter(this.filteredMaterials);
          this.notifyFilterChange('material', materialFilter)
      
          if(this.filteredMaterials.size > 0){
            this.updateSelectedFilters('materialFilter')
          }
          break;
        }


      case 'price':
        {
          

          break;
        }
        
      case 'sorting':
        {
   
          if(this.sortedBy.size > 0){
            this.sortedBy.clear()
          }
          this.sortedBy.set('sort', value.order);
          this.notifyFilterChange('ordering', value.query) 
          
          this.selectedSort = value.name  
          break;
        }
      default:
        break;
    }
 

  }



  joinQueryParamsFilter(applyedFilters: Map<number, string>){
    return [...applyedFilters.entries()].map(([key, value])=> value).join(',')
  }

  notifyFilterChange(paramName, value){
    let queryName: Params = {}
    queryName[paramName] = value
    // const queryParams: Params = { paramName: value}
    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: queryName,
        queryParamsHandling: 'merge'
        
      });
  }


  updateSelectedFilters(filter:string){
    if(!this.selectedFilters.has(filter)){

      this.selectedFilters.add(filter)
    }
  }


  getSelectedFiltersString(): Observable<string>{
     this.selectedFiltersString$.next([...this.selectedFilters].join('&'));
     return this.selectedFiltersString$.asObservable()
  }

  getSelectedSortString(): Observable<string>{
    this.selectedFiltersString$.next(this.selectedSort);
    return this.selectedSortString$.asObservable()
 }


  filter(products: Product[], category, params, priceRang){

    this.filteredProducts = this.filterByCategory(products, category);

    if(params.ordering){
      this.filteredProducts = this.filterBySorting(this.filteredProducts,params.ordering);

    } 
    
    if(params.base_color){
      this.filteredProducts = this.filterByColor(this.filteredProducts, params.base_color)

    } 
    
    if(params.size){
      this.filteredProducts = this.filterBySize(this.filteredProducts, params.size)

    } 
    
    if(params.material){
      this.filteredProducts = this.filterByMaterial(this.filteredProducts)

    }
    
    if(priceRang){
      this.filteredProducts = this.filterByPrice(this.filteredProducts, priceRang[0], priceRang[1])
    }

    return this.filteredProducts;

  }


  filterByCategory(products, category): Product[]{
    if(category){
        
      if(category === 'all') { 
        return products; 
      }

      return products.filter(p => p.category === category)        

    }else{
      return products
    }
  }


  filterBySorting(products, orderBy): Product[]{

    switch(orderBy){

      case '-price' : 
        {
          products = this.sort(this.filteredProducts, 'desc');
          break;
        }
      case 'price' : 
        {
          products = this.sort(this.filteredProducts, 'asce')
          break;
        }
      case 'is_new' : 
        {
          // products = this.sort(this.filteredProducts, 'desc')
          break;
        }
      
      default:
        {
          products = this.sort(this.filteredProducts, 'desc')
        }
    }
    return products
  }


  filterBySize(products: Product[], sizesStr: string): Product[]{
    return products.filter(p => {
      
      return sizesStr.split(',').some(size => p.sizes.includes(size));
    })
  }


  filterByColor(products: Product[], colorsStr: string): Product[]{
    return products.filter(p => {
      
      return colorsStr.split(',').some(color => p.colors.includes(color))
    })
  }


  filterByMaterial(products): Product[]{
    return products
  }


  filterByPrice(products: Product[], minPrice, maxPrice){
   return products.filter(p => p.price>= minPrice && p.price<= maxPrice)
 
  }


  sort(products: Product[] ,order){

    switch (order) {
      case "asce":
        {
          products = products.sort((low, high) => low.price - high.price);
          break;
        }

      case "desc":
        {
          products = products.sort((low, high) => high.price - low.price);
          break;
        }

      case "Name":
        {
          products = products.sort(function (low, high) {
            if (low.name < high.name) {
              return -1;
            }
            else if (low.name > high.name) {
              return 1;
            }
            else {
              return 0;
            }
          })
          break;
        }

      default: {
        products = products.sort((low, high) => low.price - high.price);
        break;
      }

    }
    return products;
  }


  
}
