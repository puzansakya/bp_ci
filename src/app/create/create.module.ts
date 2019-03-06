import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// quill
import { QuillModule } from 'ngx-quill';

// containers
import * as fromContainers from './containers';

// stores
import { CategoryStoreModule } from '../root-store/category-store/category-store.module';
import { ArticleStoreModule } from '../root-store/article-store/article-store.module';

// sidebar module
import { SidebarModule } from 'ng-sidebar';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.CreatePostComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    SidebarModule,
    QuillModule,
    ArticleStoreModule,
    CategoryStoreModule
  ],
  providers: [],
  declarations: [...fromContainers.containers],
  exports: [...fromContainers.containers],
})
export class CreateModule { }

// "ngx-quill": "^3.2.0",
// "quill": "^1.3.6",