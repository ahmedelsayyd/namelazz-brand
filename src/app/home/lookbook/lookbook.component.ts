import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lookbook',
  templateUrl: './lookbook.component.html',
  styleUrls: ['./lookbook.component.scss']
})
export class LookbookComponent implements OnInit {

  @Input() siteDirections
  constructor() { }

  ngOnInit(): void {
  }

}
