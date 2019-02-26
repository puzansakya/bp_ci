import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// stores
import { ArticleStoreModule } from '../root-store/article-store/article-store.module';
import { AuthStoreModule } from '../root-store/auth-store/auth-store.module';


// virtual scroller
import { VirtualScrollerModule } from '../virtual-scroller/virtual-scroller';

// shared module
import { SharedModule } from '../shared/shared.module';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';

// scroll event
import { ScrollEventModule } from '../scroll-event/scroll.module';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    // canActivate: [fromGuards.ArticleCollectionGuard],
    component: fromContainers.LandingComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    ArticleStoreModule,
    AuthStoreModule,
    VirtualScrollerModule,
    ScrollEventModule
  ],
  providers: [...fromGuards.guards],
  declarations: [...fromContainers.containers],
  exports: [...fromContainers.containers],
})
export class LandingModule { }
