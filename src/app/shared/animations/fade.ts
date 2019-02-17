import { trigger, state, style, animate, transition } from '@angular/animations';

export let fade = trigger('fadeInOut', [
    state('void', style({
        opacity: 0
    })),
    transition(':enter, :leave', animate(1000)),
    // transition('void <=> *', animate(1000)),
]);