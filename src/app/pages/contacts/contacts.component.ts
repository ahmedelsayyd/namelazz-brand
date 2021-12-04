import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation , AfterViewInit} from '@angular/core';
import { SwiperComponent } from 'ngx-useful-swiper';
import { SwiperOptions } from 'swiper';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ContactsComponent implements OnInit, AfterViewInit {

  @ViewChild('swiper1', { static: false }) swiper1: SwiperComponent;
  @ViewChild('swiper2', { static: false }) swiper2: SwiperComponent;

  @ViewChild('btnNext', { static: false }) btnNext: ElementRef
  @ViewChild('btnPrev', { static: false }) btnPrev: ElementRef
  
  lat = 51.678418;
  lng = 7.809007;

  config1: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1'
    },
    on: {
      slideChange: () => {
        this.slideChange(this.swiper1.swiper.activeIndex)
      }
    }
  };

  config2: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2'
    },
    on: {
      slideChange: () => {
        this.slideChange(this.swiper2.swiper.activeIndex)
      }
    }
  };
  

  store1Img=[
    "../../../assets/img/stores/store1-1.jpg",
    "../../../assets/img/stores/store1-2.jpg",
    "../../../assets/img/stores/store1-3.jpg",
    "../../../assets/img/stores/store1-4.jpg",
  ]

  store2Img=[
    "../../../assets/img/stores/store2-1.jpg",
    "../../../assets/img/stores/store2-2.jpg",
  ]
  

  
  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.btnPrev.nativeElement.classList.add('swiper-button-disabled')

  }

  slideChange(activeIndex){

    if(activeIndex >= (this.store1Img.length - 1)){
      this.btnNext.nativeElement.classList.add('swiper-button-disabled')
    }else if(activeIndex <= 0){
      this.btnPrev.nativeElement.classList.add('swiper-button-disabled')
    }else{
      this.btnNext.nativeElement.classList.remove('swiper-button-disabled')
      this.btnPrev.nativeElement.classList.remove('swiper-button-disabled')
    }
  }


 submit(formValue){}

  nextSlide1() {
    this.swiper1.swiper.slideNext();
  }

  previousSlide1() {
    this.swiper1.swiper.slidePrev();
  }

  nextSlide2() {
    this.swiper2.swiper.slideNext();
  }

  previousSlide2() {
    this.swiper2.swiper.slidePrev();
  }

}
