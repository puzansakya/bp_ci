import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

// store
import { ArticleStoreModule } from '../root-store/article-store/article-store.module';

// guards
import * as fromGuards from './guards';

// shared module
import { SharedModule } from '../shared/shared.module';
import { ScrollEventModule } from '../scroll-event/scroll.module';
import { VirtualScrollerModule } from '../virtual-scroller/virtual-scroller';
import { AuthModule } from '../auth/auth.module';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.BookmarkExistsGuard],
    component: fromContainers.BookmarkComponent,
  }
];

@NgModule({
  declarations: [...fromContainers.containers],
  imports: [
    CommonModule,
    ArticleStoreModule,
    SharedModule,
    AuthModule,
    ScrollEventModule,
    VirtualScrollerModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [...fromContainers.containers],
})
export class BookmarkModule { }
