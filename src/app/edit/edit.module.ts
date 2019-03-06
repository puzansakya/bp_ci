import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';

// stores
import { CategoryStoreModule } from '../root-store/category-store/category-store.module';
import { ArticleStoreModule } from '../root-store/article-store/article-store.module';
import { AuthStoreModule } from '../root-store/auth-store/auth-store.module';

// sidebar
import { SidebarModule } from 'ng-sidebar';

// quill
import { QuillModule } from 'ngx-quill';

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
    ArticleStoreModule,
    CategoryStoreModule,
    ReactiveFormsModule,
    FormsModule,    
    SidebarModule,
    QuillModule,
  ],
  providers: [...fromGuards.guards],
  exports: [
    ...fromContainers.containers
  ]
})
export class EditModule { }
