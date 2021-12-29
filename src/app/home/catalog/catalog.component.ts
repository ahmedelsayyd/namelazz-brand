import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  @Input() siteDirections
  @Input() loadedComponent
  filterdProducts

  catalogProduct=[
    {
      category: 'jackets & Sleeves',
      name: '',
      price: 7500,
      image:'../../../../assets/img/home/catalog-1.jpg'

    },
    {
      category: 'jumpsuits',
      name: '',
      price: 7500,
      image:'../../../../assets/img/home/catalog-2.jpg'
    },    {
      category: 'dresses',
      name: '',
      price: 7500,
      image:'../../../../assets/img/home/catalog-3.jpg'
    }
  ]
  constructor() { }

  ngOnInit(): void {
    
  }

}
