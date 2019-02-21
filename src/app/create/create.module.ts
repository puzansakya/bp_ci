import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// quill
import { QuillModule } from 'ngx-quill';

// containers
import * as fromContainers from './containers';
import { FormsModule } from '@angular/forms';
import { ArticleStoreModule } from '../root-store/article-store/article-store.module';
import { SidebarModule } from 'ng-sidebar';
import { CategoryStoreModule } from '../root-store/category-store/category-store.module';

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