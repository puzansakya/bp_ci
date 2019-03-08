import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './main/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TransferHttpCacheModule } from '@nguniversal/common';

// toaster
import { ToastrModule } from 'ngx-toastr';

// services
import * as fromServices from './core/services';

// shared module
import { SharedModule } from './shared/shared.module';

// auth module
import { AuthModule } from './auth/auth.module';

// ngrx imports
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

import { reducers, effects, CustomSerializer } from "./root-store/router-store";

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


// this would be done dynamically with webpack for builds
// const environment = {
//   development: true,
//   production: false,
// };

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    TransferHttpCacheModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,    
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      closeButton: true,
      preventDuplicates: true,
    }),
    NgtUniversalModule,
    AuthModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }, ...fromServices.services],
  bootstrap: [AppComponent]
})
export class AppModule { }
