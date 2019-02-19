import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';


// guards
import * as fromGuards from './guards';
import { ArticleStoreModule } from '../root-store/article-store/article-store.module';
import { AuthStoreModule } from '../root-store/auth-store/auth-store.module';

// routes
export const ROUTES: Routes = [
    {
        path: ':slug',
        canActivate: [fromGuards.ArticleGuard],
        component: fromContainers.ArticleComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        ArticleStoreModule,
        AuthStoreModule
    ],
    providers: [...fromGuards.guards],
    declarations: [...fromContainers.containers],
    exports: [...fromContainers.containers],
})
export class ArticleModule { }
