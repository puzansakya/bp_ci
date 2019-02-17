import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('article', reducers),
    EffectsModule.forFeature(effects),
  ]
})
export class ArticleStoreModule { }
