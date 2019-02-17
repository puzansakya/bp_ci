import { Component, OnInit, OnDestroy } from '@angular/core';


import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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


  constructor(private store: Store<fromStore.ArticleState>) { }

  ngOnInit() {
    // this.store.dispatch(new fromStore.LoadArticle('an-unforgettable-valentines-day-18'));
    this.article$ = this.store.select(fromStore.getArticle);
    //   .pipe(
    //     takeUntil(this._destroyed$),
    // ).subscribe(data => {
    //   this.article = data;
    //   console.log(data);
    // });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }


}
