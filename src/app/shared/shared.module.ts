import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// store
import { CategoryStoreModule } from '../root-store/category-store/category-store.module';

// drag and scroll
import { DragScrollModule } from 'ngx-drag-scroll';

// components
import * as fromComponents from './components';

// animations
import * as fromAnimations from './animations';

// directives
import * as fromDirectives from './directives';

import { RouterModule }       from '@angular/router';
import { AuthModule }         from '../auth/auth.module';
import { NgbDropdownModule }  from '../dropdown/dropdown.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthModule,
    NgbDropdownModule,
    DragScrollModule,
    CategoryStoreModule,
  ],
  declarations: [
    ...fromComponents.components,
    ...fromDirectives.directives    
  ],
  exports: [
    ...fromComponents.components,
    // ...fromDirectives.directives
  ],
})
export class SharedModule { }
