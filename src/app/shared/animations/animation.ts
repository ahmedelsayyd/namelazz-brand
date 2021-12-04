import { animate, state, style, transition, trigger } from "@angular/animations";
import { translate } from "@angular/localize/src/utils";

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



export const toggoleSideNavtrigger = trigger('toggoleSideNav', [
    state('hide', style({
        visibility: 'hidden',
        width:0,
        opacity: 0,
        left: '-130%',
    })),
    state('show', style({
        visibility: 'visible',
        width: '30%',
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