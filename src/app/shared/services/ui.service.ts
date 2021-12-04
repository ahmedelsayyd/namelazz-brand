import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  ToggoleLoginCard = new BehaviorSubject<boolean>(false)
  // Toggole Side Naigation
  openSideNav = new BehaviorSubject<boolean>(false)

  // handel FORM Input errors anf hints
  isFocused = new Subject<{ focused: boolean, el: string }>();

  // trake loaded Components and screen scrolling
  loadedComponent = new BehaviorSubject<string>('')
  scrollTopValue = new BehaviorSubject<number>(0)

  loadedComponent$ = this.loadedComponent.asObservable()
  scrollTopValue$ = this.scrollTopValue.asObservable()

  toggoleDropdown: boolean;

  constructor(    
    private zone: NgZone,

    @Inject(DOCUMENT) private document: any) {

  }

  updateScrollPosition(scroll: number) {
    this.scrollTopValue.next(scroll)
  }

  setLoadedComponent(compName: string) {
    this.loadedComponent.next(compName)
  }

  changeNavTheme(scrollTop, loadedComponent) {
    if (loadedComponent != "home" && loadedComponent != "UserComponent" && scrollTop <= 5) {

      document.documentElement.style.setProperty('--nav-background', '#fbf6f2')
      document.documentElement.style.setProperty('--nav-color', '#1a1615')
      document.documentElement.style.setProperty('--nav-height', 8 + 'rem')

      return;
    } else if (loadedComponent != "home" && loadedComponent != "UserComponent" && scrollTop >= 5) {

      document.documentElement.style.setProperty('--nav-background', '#fbf6f2')
      document.documentElement.style.setProperty('--nav-color', '#1a1615')
      document.documentElement.style.setProperty('--nav-height', 5.6 + 'rem')

      return;
    }

    if (scrollTop >= (window.innerHeight * 3 / 4)) {

      document.documentElement.style.setProperty('--nav-background', '#fbf6f2')
      document.documentElement.style.setProperty('--nav-color', '#1a1615')
      document.documentElement.style.setProperty('--nav-height', 5.6 + 'rem')
    } else {
      document.documentElement.style.setProperty('--nav-background', 'transparent')
      document.documentElement.style.setProperty('--nav-color', '#fbf6f2')
      document.documentElement.style.setProperty('--nav-height', 8 + 'rem')
    }
  }

  updateLoadedComponent(loadedComponent) {

    (loadedComponent != "HomeComponent" ? this.setLoadedComponent(loadedComponent)
      : this.setLoadedComponent('home'));
  }

  
  // private setupClickListener() {
  //   this.zone.runOutsideAngular(() => {

  //     fromEvent(this.document, "click").subscribe((e:MouseEvent) => {

  //       if (!this.elRef.nativeElement.contains(e.target) && this.toggoleDropdown) {
  //         this.zone.run(() => {
  //           this.toggoleDropdown= !this.toggoleDropdown
  //         });
  //       }
  //     });
  //   })
  // }


}
