import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

// store
import { ArticleStoreModule } from '../root-store/article-store/article-store.module';

// guards
import * as fromGuards from './guards';

// routes
export const ROUTES: Routes = [
  {
    path: ':authorId',
    canActivate: [fromGuards.BookmarkExistsGuard],
    component: fromContainers.BookmarkComponent,
  }
];

@NgModule({
  declarations: [...fromContainers.containers],
  imports: [
    CommonModule,
    ArticleStoreModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [...fromContainers.containers],
})
export class BookmarkModule { }
