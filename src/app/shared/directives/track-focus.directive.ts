import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { UiService } from '../services/ui.service';

@Directive({
  selector: '[trackFocus]'
})
export class TrackFocusDirective {

  @Input() isSelected: boolean


  @HostListener("focus") onFocus() {

    let focusListner = {
      focused: true,
      el: this.el.nativeElement.name
    }

    this.uiService.isFocused.next(focusListner)

  }

  @HostListener('blur', ['$event']) onBlur(e) {
    let BlurListner = {
      focused: false,
      el: this.el.nativeElement.name
    }
    this.uiService.isFocused.next(BlurListner)
  }



  // Handel product Details ADD TO CART  Button
  @HostListener('mouseenter', ['$event']) mouseenter(e){
    if(!this.isSelected){
      this.render.setProperty(this.el.nativeElement,'textContent','choose size')
    }
  }

  @HostListener('mouseleave', ['$event']) mouseleave(e){
    this.render.setProperty(this.el.nativeElement,'textContent','ADD TO CART')
  }


  

  constructor(private uiService: UiService, private el: ElementRef, private render:Renderer2) { }

}
