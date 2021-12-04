import { Component, OnInit } from '@angular/core';
import { headerAnimationtrigger } from 'src/app/shared/animations/header.animation';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    headerAnimationtrigger
  ]
})
export class HeaderComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
  }

}
