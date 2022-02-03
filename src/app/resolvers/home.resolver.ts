import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<boolean> {

  constructor(){}

    resolve(): Observable<boolean> {
    return of(false).pipe(delay(6900))
  }
}
