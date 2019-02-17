import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import * as decode from 'jwt-decode';
import { User } from "../../core/models/user.model";

import * as fromServices from '../../core/services';

// store and actions
import { Store } from '@ngrx/store';
import * as fromAuthStore from '../../root-store/auth-store';
import { Observable } from 'rxjs';
@Directive({
    selector: "[rbacAllow]"
})
export class RbacAllowDirective implements OnDestroy {

    allowedRoles: string[];
    user: User = null;
    roles: string[];


    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: fromServices.AuthenticationService,
        private store: Store<fromAuthStore.AuthState>

    ) {        
        this.user = this.authService.getAuthUser();
        // this.roles = decode(this.user.token).roles;
        this.roles = this.user.roles;        
        this.showIfUserAllowed();
    }

    ngOnDestroy() {

    }

    @Input()
    set rbacAllow(allowedRoles: string[]) {
        this.allowedRoles = allowedRoles;
        this.showIfUserAllowed();
    }

    showIfUserAllowed() {

        if (!this.allowedRoles || this.allowedRoles.length === 0 || !this.user) {
            this.viewContainer.clear();
            return;
        }

        const isUserAllowed =
            this.allowedRoles.filter(Set.prototype.has, new Set(this.roles)).length > 0;


        if (isUserAllowed) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }

    }

}











