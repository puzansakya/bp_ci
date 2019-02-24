import { Component, OnInit, OnDestroy } from '@angular/core';


import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';

import * as fromStore from '../../../root-store/article-store';
import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  article$: Observable<Article>;
  private _destroyed$ = new Subject();


  constructor(
    private store: Store<fromStore.ArticleState>,
  ) { }

  ngOnInit() {
    this.article$ = this.store.select(fromStore.getArticle);
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();    
  }


}
