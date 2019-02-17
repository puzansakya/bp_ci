import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from '.';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('category', reducers),
    EffectsModule.forFeature(effects),
  ]
})
export class CategoryStoreModule { }
