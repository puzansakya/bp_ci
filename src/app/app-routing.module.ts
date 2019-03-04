import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// auth guards
import * as fromGuards from './auth/guards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './landing/landing.module#LandingModule'
  },
  {
    path: 'articles',
    loadChildren: './article/article.module#ArticleModule'
  },
  {
    path: 'authors',
    loadChildren: './author/author.module#AuthorModule'
  },
  {
    path: 'create',
    canActivate: [fromGuards.AuthGuard], data: { expectedRole: ['ADMIN'] },
    loadChildren: './create/create.module#CreateModule'
  },
  {
    path: 'categories',
    canActivate: [fromGuards.AuthGuard], data: { expectedRole: ['ADMIN'] },
    loadChildren: './category/category.module#CategoryModule'
  },
  {
    path: 'bookmarks',
    canActivate: [fromGuards.AuthGuard],
    loadChildren: './bookmark/bookmark.module#BookmarkModule'
  },
  {
    path: 'mystories',
    canActivate: [fromGuards.AuthGuard],
    loadChildren: './mystories/mystories.module#MystoriesModule'
  },
  {
    path: '404',
    loadChildren: './notfound/notfound.module#NotfoundModule'
  },
  {
    path: 'edit',
    canActivate: [fromGuards.AuthGuard], data: { expectedRole: ['ADMIN'] },
    loadChildren: './edit/edit.module#EditModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
