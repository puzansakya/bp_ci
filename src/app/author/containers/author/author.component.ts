import { Component, OnInit, OnDestroy } from '@angular/core';

// store
import * as fromArticleStore from '../../../root-store/article-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit, OnDestroy {

  articles$: Observable<Article[]>;

  constructor(
    private articleStore: Store<fromArticleStore.ArticleState>,
  ) { }

  ngOnInit() {
    this.articles$ = this.articleStore.select(fromArticleStore.getArticles);
  }

  ngOnDestroy(): void {
    this.articleStore.dispatch(new fromArticleStore.Reset())
  }

}
