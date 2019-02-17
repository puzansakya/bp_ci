import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import * as decode from 'jwt-decode';
import { User } from "../../core/models/user.model";

import * as fromServices from '../../core/services';

// store and actions
import { Store } from '@ngrx/store';
import * as fromAuthStore from '../../root-store/auth-store';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Directive({
    selector: "[allow]"
})
export class AllowDirective implements OnDestroy {

    allowed: string[];
    roles: string[]


    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: fromServices.AuthenticationService,
        private store: Store<fromAuthStore.AuthState>

    ) {        
        this.allowIt();
    }

    ngOnDestroy() {

    }

    @Input()
    set allow(allowed: string[]) {
        this.allowed = allowed;        
        this.allowIt();
    }

    @Input()
    set allowProvide(roles: string[]) {
        this.roles = roles;        
        this.allowIt();
    }

    allowIt() {

        if(!this.allowed || this.allowed.length === 0) {
            this.viewContainer.clear();
            return;
        }

        const isUserAllowed =
            this.allowed.filter(Set.prototype.has, new Set(this.roles)).length > 0;


        if (isUserAllowed) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }

    }

}











