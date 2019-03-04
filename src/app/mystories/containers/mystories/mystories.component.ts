// angular imports
import { Component, OnInit } from '@angular/core';

// rxjs
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

// store
import { Store } from '@ngrx/store';
import * as fromArticleStore from '../../../root-store/article-store';

// models
import { Article } from '../../../core/models/article.model';

//others
import { ScrollEvent } from '../../../scroll-event/scroll.directive';

// services
import { SeoService } from '../../../core/services';

@Component({
  selector: 'app-mystories',
  templateUrl: './mystories.component.html',
  styleUrls: ['./mystories.component.scss']
})
export class MystoriesComponent implements OnInit {

  // containers for store observable
  articles$: Observable<Article[]>;
  loading$: Observable<boolean>;

  // reference to unsubscribe observables
  private _destroyed$ = new Subject();

  // initial pgae number
  page: number = 0;

  constructor(
    private articleStore: Store<fromArticleStore.ArticleState>,    
    private seo: SeoService
  ) { }

  ngOnInit() {    
    // store the articles observable
    this.loading$ = this.articleStore.select(fromArticleStore.getArticleLoading);
    // store the loading observable
    this.articles$ = this.articleStore.select(fromArticleStore.getArticles).pipe(
      tap((articles: Article[]) => console.log(articles))
    );
    // set meta tags
    this.seo.generateTags({
      title: 'Medium clone',
      description: 'This is the pwa medium clone built with angular and universal',
      image: 'https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80 334w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80 634w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80 668w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80 934w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80 1234w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1268&q=80 1268w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80 1534w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80 1834w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80 1868w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80 2134w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2434&q=80 2434w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2468&q=80 2468w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80 2734w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3034&q=80 3034w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3068&q=80 3068w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3334&q=80 3334w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3634&q=80 3634w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3668&q=80 3668w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3934&q=80 3934w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4000&q=80 4000w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4000&q=80 4000w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4000&q=80 4000w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4000&q=80 4000w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4000&q=80 4000w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4000&q=80 4000w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4000&q=80 4000w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4000&q=80 4000w, https://images.unsplash.com/photo-1501772529219-ed0014f5032c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4000&q=80 4000w',
      slug: 'https://medium-puzan.herokuapp.com'
    })
  }

  /**
   * Handles the scrolling of the page and perform dispatch of loading articles
   * 
   * @param event
   */
  public handleScroll(event: ScrollEvent) {
    // check if bottom
    if (event.isReachingBottom) {
      // retrieve the paged observable from store
      this.articleStore.select(fromArticleStore.getArticlePaged)
        .pipe(
          takeUntil(this._destroyed$),
      ).subscribe(paged => {
        // increment the page number
        let newPage = paged.page + 1;
        // check if the page number is not greater than paged total page count        
        if (newPage <= paged.pageCount) {
          // if condition satisfies dispatch action to load more
          this.debounced(5000, this.articleStore.dispatch(new fromArticleStore.LoadMyStoriesArticles(newPage)));
        }
      });
    }
  }

  /**
   * Debounce function
   * @param delay 
   * @param fn 
   */
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

  /**
   * Handles toggle bookmark for the card component
   * and dispatch bookmark action
   * @param article 
   */
  toggleBookmark(article: Article) {
    // dispatch bookmark action    
    this.articleStore.dispatch(new fromArticleStore.BookmarkRemove({ ...article, bookmarked: !article.bookmarked }));
  }

  /**
   * unsubscribe all the observables here
   */
  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
    this.articleStore.dispatch(new fromArticleStore.Reset())
  }
}
