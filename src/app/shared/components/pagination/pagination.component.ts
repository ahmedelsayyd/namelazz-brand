import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { LocaleService } from '../../services/locale.service';
import { PaginationData, PaginationService } from './pagination.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
 
totalItems$= new BehaviorSubject<number>(0)
pageSize$= new BehaviorSubject<number>(0)


 @Input() loadedComponent: string
 @Input() set pageSize(value:number){ this.pageSize$.next(value) }
 @Input() set totalItems(value: number) { this.totalItems$.next(value); }

 get totalItems() {return this.totalItems$.getValue()}
 get pageSize() {return this.pageSize$.getValue()}

  pagData: PaginationData  

  pagSub:Subscription
  totalItemsSub:Subscription

  constructor(private PaginationService: PaginationService, public localService: LocaleService) {

   }

  ngOnInit(): void {

    setTimeout(()=>{

      this.totalItemsSub = combineLatest([this.totalItems$, this.pageSize$]).subscribe(x=>{
        
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
