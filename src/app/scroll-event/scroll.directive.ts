import { Directive, HostListener, Output, EventEmitter, Input, Inject } from '@angular/core';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ScrollEvent = {
    isReachingBottom: boolean,
    isReachingTop: boolean,
    originalEvent: Event,
    isWindowEvent: boolean
};

// declare const window: Window;

@Directive({
    selector: '[detect-scroll]'
})
export class ScrollDirective {
    @Output() public onScroll = new EventEmitter<ScrollEvent>();
    @Input() public bottomOffset: number = 100;
    @Input() public topOffset: number = 100;

    public window;
    protected isAngularClient: boolean;

    constructor(
        @Inject(PLATFORM_ID) platformId: Object,
        @Inject('WINDOW') private win: any
    ) {
        if (isPlatformBrowser(platformId)) {
            // localStorage will be available: we can use it.
            this.window = win;
            this.isAngularClient = isPlatformBrowser(platformId);
        }
    }

    // handle host scroll
    @HostListener('scroll', ['$event']) public scrolled($event: Event) {
        if (this.isAngularClient) {
            this.elementScrollEvent($event);
        }
    }

    // handle window scroll
    @HostListener('window:scroll', ['$event']) public windowScrolled($event: Event) {
        if (this.isAngularClient) {
            this.windowScrollEvent($event);
        }
    }

    protected windowScrollEvent($event: Event) {
        if (this.isAngularClient) {
            const target = <Document>$event.target;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            const isReachingTop = scrollTop < this.topOffset;
            const isReachingBottom = (target.body.offsetHeight - (window.innerHeight + scrollTop)) < this.bottomOffset;
            const emitValue: ScrollEvent = { isReachingBottom, isReachingTop, originalEvent: $event, isWindowEvent: true };
            this.onScroll.emit(emitValue);
        }
    }

    protected elementScrollEvent($event: Event) {
        if (this.isAngularClient) {
            const target = <HTMLElement>$event.target;
            const scrollPosition = target.scrollHeight - target.scrollTop;
            const offsetHeight = target.offsetHeight;
            const isReachingTop = target.scrollTop < this.topOffset;
            const isReachingBottom = (scrollPosition - offsetHeight) < this.bottomOffset;
            const emitValue: ScrollEvent = { isReachingBottom, isReachingTop, originalEvent: $event, isWindowEvent: false };
            this.onScroll.emit(emitValue);
        }
    }

}
