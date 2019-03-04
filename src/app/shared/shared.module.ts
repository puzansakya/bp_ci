import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    NgbDropdownModule
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
