import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, fromEvent, Observable, Subscription } from 'rxjs';
import { UiService } from './shared/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isCollapsed = false;
  loadedComponent

  toggoleNav: Observable<boolean>
  showLoginCard: Observable<boolean>;

  eventSub:Subscription

  private window:Window;

  // @HostListener("window:scroll", ["$event"]) onScroll(e: any): void {
  //   //console.log(window.innerHeight, window.outerHeight);
  //   console.log(e.target)
  //   this.uiService.updateScrollPosition(e.target.scrollingElement.scrollTop)
  // }

  constructor(
    private uiService: UiService,
    private zone: NgZone,
    private elRef: ElementRef,
    @Inject(DOCUMENT) private document: any) {
      this.window = this.document.defaultView;
     }


  ngOnInit() {

    this.setupClickListener();
    this.toggoleNav = this.uiService.openSideNav;
    this.showLoginCard = this.uiService.ToggoleLoginCard

    //this.uiService.setLoadedComponent('home')
    let scrollState = combineLatest([this.uiService.scrollTopValue$, this.uiService.loadedComponent$]);
    scrollState.subscribe(([scrollTop, loadedComponent]) => {

      this.loadedComponent = loadedComponent
      this.uiService.changeNavTheme(scrollTop, loadedComponent)
    })
  }

  
  private setupClickListener() {
    
    this.zone.runOutsideAngular(() => {

      this.eventSub = fromEvent(this.window, "scroll").subscribe((e: any) => {
        
        this.zone.run(() => {
            this.uiService.updateScrollPosition(e.target.scrollingElement.scrollTop)
        });

        //   let scrollTop = e.target.scrollingElement.scrollTop;
        //   if (this.between(scrollTop, 5, 7) || this.between(scrollTop, 3, 5) 
        //       || this.between(scrollTop, (window.innerHeight * 3 / 4), ((window.innerHeight * 3 / 4) +2))
        //       || this.between(scrollTop, ((window.innerHeight * 3 / 4) -2), (window.innerHeight * 3 / 4))
        //       || scrollTop ==0)
        //   this.zone.run(() => {
        // console.log(e.target.scrollingElement.scrollTop);
        //       this.uiService.updateScrollPosition(e.target.scrollingElement.scrollTop)
        //   });
        
      });
    })
  }

  between(x, min, max){
    return (x >= min && x <= max)
  }

  onActive(e,outlet) {    
    this.uiService.updateLoadedComponent(e.constructor.name);
    outlet.scrollTop = 0;
    window.scrollTo(0, 0);
  }


  ngOnDestroy(){
    if(this.eventSub) this.eventSub.unsubscribe()
  }
}
