import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PaginationData, PaginationService } from './pagination.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
 
totalItems$= new BehaviorSubject<number>(0)

 @Input() loadedComponent: string
 @Input() pageSize: number
 @Input() set totalItems(value: number) { 
            this.totalItems$.next(value); 
          }

 get totalItems(){
   return this.totalItems$.getValue()
 }

  pagData: PaginationData  

  pagSub:Subscription
  totalItemsSub:Subscription

  constructor(private PaginationService: PaginationService) {

   }

  ngOnInit(): void {

    setTimeout(()=>{

      this.totalItemsSub = this.totalItems$.subscribe(x=>{
        
        this.setPaginate(1)
      })
    })


    this.pagSub = this.PaginationService.currentPageDetails
    .subscribe((data: PaginationData) =>{
      this.pagData = data
    })
  }

  setPaginate(currPage) {    
    this.PaginationService.paginate(this.totalItems, currPage, this.pageSize)
 
  }

  ngOnDestroy(){
    if(this.pagSub) this.pagSub.unsubscribe()
    if(this.totalItemsSub) this.totalItemsSub.unsubscribe()
  }

}
