import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

export const toggoleLoginCardtrigger = trigger('toggoleLoginCard', [
    state('hide', style({
        visibility: 'hidden',
        opacity: 0,
        top: '-50%'
    })),
    state('show', style({
        visibility: 'visible',
        opacity: 1,
        top: '50%'
    })),

    transition('hide<=>show', [
        animate('.4s')
    ])
])



export const changePasswordCardtrigger = trigger('changePasswordCard', [
    state('hide', style({
        visibility: 'hidden',
        opacity: 0,
        transform: 'translateY(-50%)'
    })),
    state('show', style({
        visibility: 'visible',
        opacity: 1,
        transform: 'translateY(0)'
    })),

    transition('hide<=>show', [
        animate('.4s')
    ])
])



export const toggoleSideNavtrigger = trigger('toggoleSideNav', [
    state('hide', style({
        visibility: 'hidden',
        width:0,
        opacity: 0,
        left: '-130%',
    })),
    state('show', style({
        visibility: 'visible',
        width: '*',
        opacity: 1,
        left: 0

    })),

    transition('hide<=>show', [
        animate('.6s ease-in-out')
    ])
])



export const toggoleDropdowntrigger = trigger('toggoleDropdown', [
    state('hide', style({
        maxHeight: '0',
        paddingTop: '0',
        paddingBottom: '0'
    })),
    state('show', style({
        maxHeight: '*',
    })),

    transition('hide=>show', [
        style({height: 0}),
        animate('.3s ease-in-out') 
    ]),

    transition('show=>hide', [
        animate('.3s ease-in-out',style({height: 0}))
    ])
])


export const fadeInOut = trigger('fadeIn', [

    transition(':enter',[

      style({opacity: 0, transform: 'scale(0)'}),
      animate('1.5s 1s cubic-bezier(0.17, 0.89, 0.24, 1.11)', 
      keyframes([
        style({opacity: 0, offset: 0}),
        style({opacity: .4,transform : 'scale(.7)', offset: .8}),
        style({opacity: 1,transform : 'scale(1)', offset: 1}),
      ])
      
      ),
    ]),

    transition(':leave',[
      animate('1.5s  cubic-bezier(0.17, 0.89, 0.24, 1.11)', 
      keyframes([
        style({opacity: 1,transform : 'scale(1)', offset: 0}),
        style({opacity: .7,transform : 'scale(.3)', offset: .8}),
        style({opacity: 0,transform : 'scale(0)', offset: 1}),
      ]))
      
    ])

  ])

  export const backOutTrigger = trigger('backOut', [

    transition(':leave',[
        style({opacity: 0,transform: 'scale(1) translateX: 0'}),
        animate('1s  cubic-bezier(0.17, 0.89, 0.24, 1.11)',style({opacity: 0,transform: 'scale(.8) translateX: -100%'}))
    ])
  ])