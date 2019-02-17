import {
    forwardRef,
    Inject,
    Directive,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ContentChild,
    NgZone,
    Renderer2,
    OnInit,
    OnDestroy,
    ChangeDetectorRef
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { NgbDropdownConfig } from './dropdown-config';
import { positionElements, PlacementArray, Placement } from './positioning';
import { AutoClose } from './autoclose';

/**
 */
@Directive({
    selector: '[ngbDropdownMenu]',
    host: { '[class.dropdown-menu]': 'true', '[class.show]': 'dropdown.isOpen()', '[attr.x-placement]': 'placement' }
})
export class NgbDropdownMenu {
    placement: Placement = 'bottom';
    isOpen = false;

    constructor(
        @Inject(forwardRef(() => NgbDropdown)) public dropdown, private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2) { }

    getNativeElement() { return this._elementRef.nativeElement; }

    position(triggerEl, placement) {
        this.applyPlacement(positionElements(triggerEl, this._elementRef.nativeElement, placement));
    }

    applyPlacement(_placement: Placement) {
        // remove the current placement classes
        this._renderer.removeClass(this._elementRef.nativeElement.parentNode, 'dropup');
        this._renderer.removeClass(this._elementRef.nativeElement.parentNode, 'dropdown');
        this.placement = _placement;
        /**
         * apply the new placement
         * in case of top use up-arrow or down-arrow otherwise
         */
        if (_placement.search('^top') !== -1) {
            this._renderer.addClass(this._elementRef.nativeElement.parentNode, 'dropup');
        } else {
            this._renderer.addClass(this._elementRef.nativeElement.parentNode, 'dropdown');
        }
    }
}

/**
 * Marks an element to which dropdown menu will be anchored. This is a simple version
 * of the NgbDropdownToggle directive. It plays the same role as NgbDropdownToggle but
 * doesn't listen to click events to toggle dropdown menu thus enabling support for
 * events other than click.
 *
 * @since 1.1.0
 */
@Directive({
    selector: '[ngbDropdownAnchor]',
    host: { 'class': 'dropdown-toggle', 'aria-haspopup': 'true', '[attr.aria-expanded]': 'dropdown.isOpen()' }
})
export class NgbDropdownAnchor {
    anchorEl;

    constructor(@Inject(forwardRef(() => NgbDropdown)) public dropdown, private _elementRef: ElementRef<HTMLElement>) {
        this.anchorEl = _elementRef.nativeElement;
    }

    getNativeElement() { return this._elementRef.nativeElement; }
}

/**
 * Allows the dropdown to be toggled via click. This directive is optional: you can use NgbDropdownAnchor as an
 * alternative.
 */
@Directive({
    selector: '[ngbDropdownToggle]',
    host: {
        'class': 'dropdown-toggle',
        'aria-haspopup': 'true',
        '[attr.aria-expanded]': 'dropdown.isOpen()',
        '(click)': 'toggleOpen()'
    },
    providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }]
})
export class NgbDropdownToggle extends NgbDropdownAnchor {
    constructor(@Inject(forwardRef(() => NgbDropdown)) dropdown, elementRef: ElementRef<HTMLElement>) {
        super(dropdown, elementRef);
    }

    toggleOpen() { this.dropdown.toggle(); }
}

/**
 * Transforms a node into a dropdown.
 */
@Directive({ selector: '[ngbDropdown]', exportAs: 'ngbDropdown', host: { '[class.show]': 'isOpen()' } })
export class NgbDropdown implements OnInit, OnDestroy {
    private _closed$ = new Subject<void>();
    private _zoneSubscription: Subscription;

    @ContentChild(NgbDropdownMenu) private _menu: NgbDropdownMenu;

    @ContentChild(NgbDropdownAnchor) private _anchor: NgbDropdownAnchor;

    /**
     * Indicates that dropdown should be closed when selecting one of dropdown items (click) or pressing ESC.
     * When it is true (default) dropdowns are automatically closed on both outside and inside (menu) clicks.
     * When it is false dropdowns are never automatically closed.
     * When it is 'outside' dropdowns are automatically closed on outside clicks but not on menu clicks.
     * When it is 'inside' dropdowns are automatically on menu clicks but not on outside clicks.
     */
    @Input() autoClose: boolean | 'outside' | 'inside';

    /**
     *  Defines whether or not the dropdown-menu is open initially.
     */
    @Input('open') _open = false;

    /**
     * Placement of a popover accepts:
     *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
     *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
     * and array of above values.
     */
    @Input() placement: PlacementArray;

    /**
     *  An event fired when the dropdown is opened or closed.
     *  Event's payload equals whether dropdown is open.
     */
    @Output() openChange = new EventEmitter();

    constructor(
        private _changeDetector: ChangeDetectorRef, config: NgbDropdownConfig, @Inject(DOCUMENT) private _document: any,
        private _ngZone: NgZone, private _autoClose: AutoClose) {
        this.placement = config.placement;
        this.autoClose = config.autoClose;
        this._zoneSubscription = _ngZone.onStable.subscribe(() => { this._positionMenu(); });
    }

    ngOnInit() {
        if (this._menu) {
            this._menu.applyPlacement(Array.isArray(this.placement) ? (this.placement[0]) : this.placement as Placement);
        }

        if (this._open) {
            this._setCloseHandlers();
        }
    }

    /**
     * Checks if the dropdown menu is open or not.
     */
    isOpen(): boolean { return this._open; }

    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     */
    open(): void {
        if (!this._open) {
            this._open = true;
            this._positionMenu();
            this.openChange.emit(true);
            this._setCloseHandlers();
        }
    }

    private _setCloseHandlers() {
        this._autoClose.install(
            this.autoClose, () => this.close(), this._closed$, this._menu ? [this._menu.getNativeElement()] : [],
            this._anchor ? [this._anchor.getNativeElement()] : []);
    }

    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     */
    close(): void {
        if (this._open) {
            this._open = false;
            this._closed$.next();
            this.openChange.emit(false);
            this._changeDetector.markForCheck();
        }
    }

    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     */
    toggle(): void {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    ngOnDestroy() {
        this._closed$.next();
        this._zoneSubscription.unsubscribe();
    }

    private _positionMenu() {
        if (this.isOpen() && this._menu) {
            this._menu.position(this._anchor.anchorEl, this.placement);
        }
    }
}