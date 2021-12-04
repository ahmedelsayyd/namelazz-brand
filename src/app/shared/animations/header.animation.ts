import { animate, group, keyframes, query, state, style, transition, trigger } from "@angular/animations";



export const navBarAnimationtrigger = trigger('navBarAnimation', [
    state('animate',style({})),

    transition('animate => *',[

        group([
    
            style({
                transform:'translateY(-100%)',
                opacity:0
            }),
            animate('400ms 4s ease-out',style({
                transform:'translateY(0)',
                opacity: 1
            })),
    
            query('.navigation__logo',[
                style({
                    transform:'translateY(-100%)',
                    opacity:0
                }),
                animate('500ms 4.5s ease-out',style({
                    transform:'translateY(0)',
                    opacity: 1
                }))
            ]),
        ])
    ])
])



export const headerAnimationtrigger = trigger('headerAnimation', [

    transition(':enter',[

        group([

            query('.header__img-1',[
                style({
                    transform:'translateY(100%)',
                    opacity:0
                }),
                animate('700ms 0s ease-out',style({
                    transform:'translateY(0)',
                    opacity: 1
                }))
            ]),
    
            query('.header__img-2',[
                style({
                    transform:'translateY(100%)',
                    opacity:0
                }),
                animate('700ms 1s ease-out',style({
                    transform:'translateY(0)',
                    opacity: 1
                }))
            ]),
    
            query('.header__img-3',[
                style({
                    transform:'translateY(100%)',
                    opacity:0
                }),
                animate('700ms 2s ease-out',style({
                    transform:'translateY(0)',
                    opacity: 1
                }))
            ]),

            // ANIMATE NUMBERS

            query('.no-1',[
                style({
                    transform:'translateY(100%)',
                    opacity:0
                }),
                animate('700ms 1s ease-out',style({
                    transform:'translateY(0)',
                    opacity: 1
                }))
            ]),
    
            query('.no-2',[
                style({
                    transform:'translateY(100%)',
                    opacity:0
                }),
                animate('700ms 2s ease-out',style({
                    transform:'translateY(0)',
                    opacity: 1
                }))
            ]),
    
            query('.no-3',[
                style({
                    transform:'translateY(100%)',
                    opacity:0
                }),
                animate('700ms 3s ease-out',style({
                    transform:'translateY(0)',
                    opacity: 1
                }))
            ]),


            // Animate header Text

            query('.heading',[
                style({
                    transform:'translateY(100%)',
                    opacity:0
                }),
                animate('700ms 5s ease-out',style({
                    transform:'translateY(0)',
                    opacity: 1
                }))
            ]),
    
            query('.subHead',[
                style({
                    transform:'translateY(100%)',
                    opacity:0
                }),
                animate('700ms 5.3s ease-out',style({
                    transform:'translateY(0)',
                    opacity: 1
                }))
            ]),
    
            query('.header__link',[
                style({
                    transform: 'scale(0)',
                    opacity:0
                }),
                // animate('1000ms 4.5s ease-in-out',
                //     keyframes([
                //         style({
                //             transform: 'scale(.7)',
                //             offset:.3,
                //             opacity: .7,
                //         }),
                //         style({
                //             transform: 'scale(1) rotate(8turn)',
                //              offset:1,
                //              opacity: 1,
                //         }),
                //     ])),
                animate('700ms 5.5s ease-in-out',style({
                    transform:'scale(1)',
                    opacity: 1
                })),

                animate('1000ms .5s ease-in-out',style({
                    transform:'scale(1)  rotate(3turn)',
                    opacity: 1
                }))
            ])
        ])
    ])
])