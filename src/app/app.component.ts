import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, fromEvent, Observable, Subscription } from 'rxjs';
import { LocaleService } from './shared/services/locale.service';
import { UiService } from './shared/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('spinnerText') spinnerText: ElementRef
  isCollapsed = false;
  loadedComponent

  isLoading:boolean = true

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
    private localService: LocaleService,
    private zone: NgZone,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: any) {      
      this.window = this.document.defaultView;
     }


  ngOnInit() {
    this.localService.setHtmlDirection()
    
    this.setupClickListener();
    this.toggoleNav = this.uiService.openSideNav;
    this.showLoginCard = this.uiService.ToggoleLoginCard

    //this.uiService.setLoadedComponent('home')
    let scrollState = combineLatest([this.uiService.scrollTopValue$, this.uiService.loadedComponent$]);
    scrollState.subscribe(([scrollTop, loadedComponent]) => {

      this.loadedComponent = loadedComponent
      this.uiService.changeNavTheme(scrollTop, loadedComponent)
    })



    setTimeout(()=>{ this.isLoading= false},7000)    
    
  }
  

  ngAfterViewInit(){

  // handel Loading SPINNER
  this.spinnerText.nativeElement.innerHTML = this.spinnerText.nativeElement.textContent.replace(/\S/g, "<span>$&</span>")
    const spinnerTextElements = this.spinnerText.nativeElement.childNodes

    for(let [index, el] of spinnerTextElements.entries()){

      let style ={
        'color': '#1a1615',
        'display': 'inline-block',
        'position': 'absolute',
        'text-transform': 'uppercase',
        'transform-origin': '0 10rem',
        'top': '-10rem',
        'transform': `rotate(${index * 20}deg)`,
        'line-height': '4.5',
        'font-weight':'600'
      }

      for(let p in style)
      el.style[p] = style[p]
    }
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
    console.log(e);
    
    this.uiService.updateLoadedComponent(e.componentName);
    outlet.scrollTop = 0;
    window.scrollTo(0, 0);
  }


  ngOnDestroy(){
    if(this.eventSub) this.eventSub.unsubscribe()
  }
}
