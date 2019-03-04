import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';
import { AuthStoreModule } from '../root-store/auth-store/auth-store.module';
import { ArticleStoreModule } from '../root-store/article-store/article-store.module';

// routes
export const ROUTES: Routes = [
  {
      path: ':slug',
      canActivate: [fromGuards.ArticleExistsGuard],
      component: fromContainers.EditComponent,
  }
];

@NgModule({
  declarations: [
    ...fromContainers.containers
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AuthStoreModule,
    ArticleStoreModule
  ],
  providers: [...fromGuards.guards],
  exports: [
    ...fromContainers.containers
  ]
})
export class EditModule { }
