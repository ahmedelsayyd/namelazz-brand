import { Component, HostListener, NgZone, OnInit, OnDestroy,ElementRef, Inject,} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { toggoleSideNavtrigger, toggoleDropdowntrigger } from 'src/app/shared/animations/animation';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [

    //annimations trigger
    toggoleSideNavtrigger,
    toggoleDropdowntrigger
  ]
})
export class SideNavComponent implements OnInit, OnDestroy{
  slideDown:boolean = false;
  toggoleNav: boolean

  activeSubMenue:string
  subMenue ={
    catalog : {isOpened: false},
    projects:{isOpened: false},
    buyers: {isOpened: false}
  }

  eventSub:Subscription
  sideNavSub:Subscription
  
  // @HostListener('click', ['$event']) click(e) {
  //   e.stopPropagation();

  // }

  // @HostListener('document:click', ['$event']) resetToggle(e){
  //   console.log("onClick");
      
  //   this.uiService.openSideNav.next(false)
  // }

  constructor(
    private uiService:UiService, 
    public authService:AuthService, 
    private route:Router,
    private zone: NgZone,
    private elRef: ElementRef,
    @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {

    this.setupClickListener();

    this.sideNavSub = this.uiService.openSideNav.subscribe((status)=>{
      this.toggoleNav = status
    });
  }

  private setupClickListener() {
    this.zone.runOutsideAngular(() => {

      this.eventSub = fromEvent(this.document, "click").subscribe((e:MouseEvent) => {

        if (!this.elRef.nativeElement.contains(e.target) && this.toggoleNav) {
          this.zone.run(() => {
            this.uiService.openSideNav.next(false)
          });
        }
      });
    })
  }


  toggoleSideNav(e){
    e.stopPropagation()
    this.uiService.openSideNav.next(false)
  }


  toggoleSubMenu(menuName, e){
    e.stopPropagation();
    for(let i in this.subMenue){
      if(i == menuName){
        
        this.subMenue[i].isOpened = !this.subMenue[i].isOpened;
        this.subMenue[i].isOpened ? this.activeSubMenue = menuName : this.activeSubMenue = '';

      }else{
        this.subMenue[i].isOpened = false
      }      
    }

  }


  navigateTo(path){
    this.uiService.openSideNav.next(false)
    this.route.navigate([path])
  }


  navigateUser(){
    this.uiService.openSideNav.next(false)
    if(this.authService.isLoggedIn) {
      this.route.navigate(['/user/account'])
    }else{
      this.route.navigate(['/login'])
    }
  }



  ngOnDestroy(){
    if(this.eventSub) this.eventSub.unsubscribe()
    if(this.sideNavSub) this.sideNavSub.unsubscribe()
  }
}
