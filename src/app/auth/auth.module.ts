import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// containers
import * as fromContainers from './containers';

// directives
// import * as fromDirectives from './directives';

// interceptors
import * as fromInterceptors from './interceptors';

// guards
import * as fromGuards from './guards';

// store
import { AuthStoreModule } from '../root-store/auth-store/auth-store.module';

// routes
export const ROUTES: Routes = [
  // {
  //   path: '',
  //   canActivate: [fromGuards.AuthGuard],
  //   component: fromContainers.HomeComponent,
  // },
  {
    path: 'login',
    component: fromContainers.LoginComponent,
  },
  // {
  //   path: 'admin',
  //   canActivate: [fromGuards.AuthGuard],
  //   data: {
  //     expectedRole: ['ADMIN']
  //   },
  //   component: fromContainers.AdminComponent,
  // }
];

@NgModule({
  declarations: [
    ...fromContainers.containers,
    // ...fromDirectives.directives
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthStoreModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    ...fromGuards.guards,
    { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.ErrorInterceptor, multi: true },
  ],
  exports: [
    ...fromContainers.containers,
    // ...fromDirectives.directives
  ]
})
export class AuthModule { }
