import { DOCUMENT } from '@angular/common';
import { Inject, Injectable,LOCALE_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  siteDirections = new BehaviorSubject({startDirection: 'left', endDirection: 'right'})
  constructor(
    @Inject(LOCALE_ID) private locale: String,
    @Inject(DOCUMENT) private document:Document) {
    this.locale = this.locale.split('-')[0];
   }

   setHtmlDirection(){
     const body = this.document.getElementsByTagName('body');

     if(this.locale === "ar"){
      body[0].setAttribute("dir","rtl")

      this.setDirectionVariables('right', 'left', -1)
      this.siteDirections.next({startDirection: 'right', endDirection: 'left'})
     } 
     else {
       body[0].setAttribute("dir","ltr")
       
       this.setDirectionVariables('left', 'right', 1)
       this.siteDirections.next({startDirection: 'left', endDirection: 'right'})

      }
     
   }

   setDirectionVariables(startDir, endDir, transformDir){
    document.documentElement.style.setProperty("--start-direction", startDir)
    document.documentElement.style.setProperty("--end-direction", endDir)
    document.documentElement.style.setProperty("--transform-direction", transformDir)

   }
}
