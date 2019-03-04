import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';

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
  ],
  providers: [...fromGuards.guards],
  exports: [
    ...fromContainers.containers
  ]
})
export class EditModule { }
