import { Component, OnInit, OnDestroy, Inject } from '@angular/core';

// stores
import { Store } from '@ngrx/store';
import * as fromArticleStore from '../../../root-store/article-store';
import * as fromAuthStore from '../../../root-store/auth-store';
import * as fromCategoryStore from '../../../root-store/category-store';

// rxjs
import { Observable, Subject, zip } from 'rxjs';
import { takeUntil, take, tap, filter, switchMap, map, concatMap, mergeMap } from 'rxjs/operators';


// models
import { Article } from '../../../core/models/article.model';

// others
import { ScrollEvent } from '../../../scroll-event/scroll.directive';

// services
import { SeoService } from '../../../core/services';

// platform
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadCategory } from '../../../root-store/category-store';
import { getCategoryLoaded } from '../../../root-store/category-store/reducers/category.reducers';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {


  categoryList = [
    'How to',
    'Creativity',
    'precious',
    'dark',
    'calculator',
    'stale',
    'phone',
    'locket',
    'undesirable',
    'shivering',
    'distribution',
    'government',
    'breakable',
    'pass',
    'How to',
    'Creativity',
    'precious',
    'dark',
    'calculator',
    'stale',
    'phone',
    'locket',
    'undesirable',
    'shivering',
    'distribution',
    'government',
    'breakable',
    'pass'
  ]


  // for drag scroll
  hideScrollbar;
  disabled;
  xDisabled;
  yDisabled;
  leftNavDisabled = false;
  rightNavDisabled = false;
  index = 0;

  // containers for store observable
  categories$: Observable<Category[]>;
  articles$: Observable<Article[]>;
  loading$: Observable<boolean>;

  // reference to unsubscribe observables
  private _destroyed$ = new Subject();

  // initial pgae number
  page: number = 0;

  isLoggedIn: boolean;

  constructor(
    private articleStore: Store<fromArticleStore.ArticleState>,
    private authStore: Store<fromAuthStore.AuthState>,
    private categoryStore: Store<fromCategoryStore.CategoryState>,
    private seo: SeoService,
    @Inject(PLATFORM_ID) public platformId: Object,
  ) { }

  ngOnInit() {
    // check loggedin
    this.authStore.select(fromAuthStore.isAuth)
      .pipe(
        take(1),
    ).subscribe((logged: boolean) => {
      this.isLoggedIn = logged;
    });

    // load and select categories 
    // this.categoryStore.select(fromCategoryStore.getCategoriesLoaded)
    //   .pipe(
    //     tap(loaded => {
    //       if (!loaded) {
    //         this.categoryStore.dispatch(new fromCategoryStore.LoadCategory);
    //       }
    //     }),
    //     filter(loaded => !loaded),
    //     take(1)
    //   ).subscribe();

    // this.categoryStore.select(fromCategoryStore.getCategories);
    // this.categoryStore.select(fromCategoryStore.getCategoriesLoaded).pipe(
    //   tap(loaded => {
    //     console.log(loaded);
    //     if (!loaded) {
    //       this.categoryStore.dispatch(new fromCategoryStore.LoadCategory);
    //     }
    //   }),
    //   switchMap(loaded => this.articleStore.select(fromArticleStore.getArticleLoaded).pipe(
    //     tap(articleLoaded => {
    //       if (!articleLoaded) {
    //         this.articleStore.dispatch(new fromArticleStore.LoadArticles(1))
    //       }
    //     }),
    //     filter(articleLoaded => !articleLoaded),
    //     take(1)
    //   )),
    //   filter(loaded => !loaded),
    //   take(1)
    // );

    // if (isPlatformBrowser(this.platformId)) {
    //   // dispatch action to load articles
    //   this.articleStore.dispatch(new fromArticleStore.LoadArticles(1));
    // }
    this.zipLoad();
    // store the articles observable
    this.loading$ = this.articleStore.select(fromArticleStore.getArticleLoading);
    // store the loading observable
    this.articles$ = this.articleStore.select(fromArticleStore.getArticles);
    // store the categories observable
    this.categories$ = this.categoryStore.select(fromCategoryStore.getCategories);
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
          this.debounced(5000, this.articleStore.dispatch(new fromArticleStore.LoadArticles(newPage)));
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
    if (this.isLoggedIn) {
      this.articleStore.dispatch(new fromArticleStore.Bookmark({ ...article, bookmarked: !article.bookmarked }));
    } else {
      this.authStore.dispatch(new fromAuthStore.Authenticated);
    }
  }

  /**
   * for drag scroll
   */

  clickItem(item) {
    console.log('item clicked');
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

  onSnapAnimationFinished() {
    console.log('snap animation finished');
  }

  onIndexChanged(idx) {
    this.index = idx;
    console.log('current index: ' + idx);
  }

  onDragScrollInitialized() {
    console.log('first demo drag scroll has been initialized.');
  }

  LoadCategory(): Observable<boolean> {
    return this.categoryStore.select(fromCategoryStore.getCategoriesLoaded).pipe(
      tap(loaded => {
        console.log(loaded);
        if (!loaded) {
          this.categoryStore.dispatch(new fromCategoryStore.LoadCategory);
        }
      }),
      filter(loaded => !loaded),
      take(1)
    )
  }

  LoadArticles(): Observable<boolean> {
    return this.articleStore.select(fromCategoryStore.getCategoriesLoaded).pipe(
      tap(loaded => {
        console.log(loaded);
        if (!loaded) {
          this.articleStore.dispatch(new fromArticleStore.LoadArticles(1));
        }
      }),
      filter(loaded => !loaded),
      take(1)
    );
  }

  zipLoad() {
    this.categoryStore.select(fromCategoryStore.getCategoriesLoaded).pipe(
      tap(categoryloaded => {
        console.log('categoryloaded', categoryloaded);
        if (!categoryloaded) {
          this.categoryStore.dispatch(new fromCategoryStore.LoadCategory);
        }
      },
        filter(categoryLoaded => !categoryLoaded)),
      take(2)
    ).subscribe(x => {
      if (x) {
        this.articleStore.select(fromArticleStore.getArticleLoaded).pipe(
          tap(articleloaded => {
            console.log('articleloaded', articleloaded);
            if (!articleloaded) {
              this.articleStore.dispatch(new fromArticleStore.LoadArticles(1));
            }
          },
            filter(articleloaded => !articleloaded)),
          take(1)
        ).subscribe();
      }
    });
  }
  /**
   * unsubscribe all the observables here
   */
  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
