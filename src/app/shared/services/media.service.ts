import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private displayNameMap = new Map([
    ['(max-width: 390px)', 'xxs'],
    ['(max-width: 575.98px)', 'xs'],
    ['(min-width: 576px) and (max-width: 768px)', 'sm'],
    ['(min-width: 768px) and (max-width: 991.98px)', 'md'],
    ['(min-width: 992px) and (max-width: 1199.98px)', 'lg'],
    ['(min-width: 1200px)', 'xl'],
  ]);

  // displayNameMap = new Map([
  //   [Breakpoints.XSmall, 'XSmall'],
  //   [Breakpoints.Small, 'Small'],
  //   [Breakpoints.Medium, 'Medium'],
  //   [Breakpoints.Large, 'Large'],
  //   [Breakpoints.XLarge, 'XLarge'],
  // ]);

  constructor( private breakpointObserver: BreakpointObserver) { 

    
  }

  layOutChangesListner(breakpoints: string[]){
    const layoutChanges = this.breakpointObserver.observe(breakpoints);
    
    return layoutChanges.pipe(map(result => {

      for (const query of Object.keys(result.breakpoints)) {

        if (result.breakpoints[query])  return this.displayNameMap.get(query) ?? 'Unknown'
        
      }   
      
    }))
  }


   
  // private matches = new ReplaySubject<{isMatch: boolean, media: string}>(1);
  // public match$ = this.matches.asObservable();

  // constructor(
  //   public readonly query: {query: string, media: string}[]) {

  //   if(window){

  //      const mediaQueryList=[]
  //      this.query.forEach(query =>{
  //       mediaQueryList.push({query : window.matchMedia(query.query) , media: query.media});
        
  //      })

  //      // here we pass value to our ReplaySubject
  //      const listener = (event, media) => {

  //        this.matches.next({isMatch: event.matches, media: media});
  //       }
  //      // run once and then add listener
       
  //      mediaQueryList.forEach(mediaQuery =>{
  //        listener(mediaQuery.query, mediaQuery.media);
  //       mediaQuery.query.addEventListener('change', (event)=> listener(event, mediaQuery.media));

  //      })
  //     }

    
  //  }
}
