import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// containers
import * as fromContainers from './containers';

// components
import * as fromCompoonents from './components';

// store
import { CategoryStoreModule } from '../root-store/category-store/category-store.module';

// shared
import { SharedModule } from '../shared/shared.module';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.CategoryComponent,
  }
];
@NgModule({
  declarations: [...fromContainers.containers, fromCompoonents.CategoryFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoryStoreModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class CategoryModule { }
