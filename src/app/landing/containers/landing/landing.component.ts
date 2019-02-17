import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import * as fromStore from '../../../root-store/article-store';
import { Article } from '../../../core/models/article.model';
// import { ChangeEvent } from '../../../virtual-scroller/virtual-scroller';
import { ScrollEvent } from '../../../scroll-event/scroll.directive';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  articles$: Observable<Article[]>;
  loading$: Observable<boolean>;
  private _destroyed$ = new Subject();
  page: number = 0;  

  constructor(private store: Store<fromStore.ArticleState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadArticles(1));
    this.loading$ = this.store.select(fromStore.getArticleLoading);
    this.articles$ = this.store.select(fromStore.getArticles);
  }

  // public fetchMore(event: ChangeEvent) {
  //   console.table('fetch', this.page);
  //   // check if page_count === this.page then stop
  //   this.store.select(fromStore.getArticlePaged)
  //     .pipe(
  //       takeUntil(this._destroyed$),
  //   ).subscribe(paged => {
  //     if (paged.pageCount === this.page) return;
  //     if (event.end === this.buffer.length - 1) {
  //       this.debounced(200, this.store.dispatch(new fromStore.LoadArticles(this.page)));
  //       this.debounced(5000, this.page++);
  //     }
  //   });

  // }  

  public handleScroll(event: ScrollEvent) {
    if (event.isReachingBottom) {
      this.store.select(fromStore.getArticlePaged)
        .pipe(
          takeUntil(this._destroyed$),
      ).subscribe(paged => {
        let newPage = paged.page + 1;        
        if (newPage <= paged.pageCount) {
          this.debounced(5000, this.store.dispatch(new fromStore.LoadArticles(newPage)));
        }
      });
    }
  }

  public debounced(delay, fn) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }

  toggleBookmark(article: Article) {    
    this.store.dispatch(new fromStore.Bookmark({ ...article, bookmark: true }));
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
