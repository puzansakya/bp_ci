import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';
import { ArticleStoreModule } from '../root-store/article-store/article-store.module';

// routes
export const ROUTES: Routes = [
  {
    path: ':authorId',
    canActivate: [fromGuards.AuthorExistsGuard],
    component: fromContainers.AuthorComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ArticleStoreModule
  ],
  providers: [],
  declarations: [...fromContainers.containers],
  exports: [...fromContainers.containers],
})
export class AuthorModule { }
