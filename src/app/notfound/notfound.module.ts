import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// containers
import * as fromContainers from './containers';
import { Routes, RouterModule } from '@angular/router';

// routes
export const ROUTES: Routes = [
  {
      path: '',      
      component: fromContainers.NotfoundComponent,
  }
];

@NgModule({
  declarations: [
    ...fromContainers.containers
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
  exports: [
    ...fromContainers.containers
  ]
})
export class NotfoundModule { }
