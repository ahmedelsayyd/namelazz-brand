import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnDestroy, OnInit, AfterViewInit, Input} from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[Dragging]'
})
export class DraggingDirective implements OnInit, AfterViewInit ,OnDestroy{

  elRendered$ = new BehaviorSubject<boolean>(false)
  @Input() set elRendered (status) {
    this.elRendered$.next(status)
  } 

  get elRendered(){
    console.log(this.elRendered$.getValue());
    return this.elRendered$.getValue()
    
  }

  private element: HTMLElement;
  defaultInitialX

  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement as HTMLElement;
    if(this.elRendered){
      console.log('renderddddddddddd');
      
      this.defaultInitialX = this.element.clientLeft
      console.log(this.defaultInitialX);
    }
    
    this.initDrag();
  }

  ngAfterViewInit(){

  }

  initDrag(): void {

    // 1
    const hover$ = fromEvent<MouseEvent>(this.element, "mouseover")
    const dragStart$ = fromEvent<MouseEvent>(this.element, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
      takeUntil(dragEnd$)
    );

    const hoverSub = hover$.subscribe((event: MouseEvent)=>{
      this.defaultInitialX = event.clientX
      console.log(this.defaultInitialX);
      
    }) 

    // 2
    let initialX: number,
      initialY: number,
      currentX = 0,
      currentY = 0;

    let dragSub: Subscription;

    // 3
    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX;
      // initialY = event.clientY - currentY;
      this.element.classList.add('free-dragging');

      // 4
      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        currentX = event.clientX - initialX;
        // currentY = event.clientY - initialY;

        this.element.style.transform =
          // "translate3d(" + currentX + "px, " + currentY + "px, 0)";
          "translate3d(" + currentX + "px, 0, 0)";
      });
    });

    // 5
    const dragEndSub = dragEnd$.subscribe(() => {
      initialX = currentX;
      // initialY = currentY;
      this.element.classList.remove('free-dragging');
      if (dragSub) {
        dragSub.unsubscribe();
      }
    });

    // 6
    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
      dragSub,
      dragEndSub,
    ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }
}
