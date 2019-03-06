import { Component, OnInit, OnDestroy } from '@angular/core';

// store
import { Store } from '@ngrx/store';
import * as fromArticleStore from './../../../root-store/article-store';
import * as fromCategoryStore from '../../../root-store/category-store';
import { tap, take, filter, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Category } from '../../../core/models/category.model';
import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  private _destroyed$ = new Subject();

  // observables
  success$: Observable<string>;
  categories$: Observable<Category[]>;

  // fileupload variables
  selectedFiles: FileList;
  currentFileUpload: File = null;
  url: string = "http://i.pravatar.cc/500?img=7";

  model: Article = {
    category_id: null
  };
  constructor(
    public fromArticleStore: Store<fromArticleStore.ArticleState>,
    public fromCategoryStore: Store<fromCategoryStore.CategoryState>
  ) { }

  ngOnInit() {
    this.fromArticleStore.select(fromArticleStore.getArticle).pipe(
      take(2),
    ).subscribe((article: Article) => {
      if (article) {
        this.model = Object.assign({}, article);;
      }
    });

    this.fromCategoryStore.select(fromCategoryStore.getCategoriesLoaded)
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.fromCategoryStore.dispatch(new fromCategoryStore.LoadCategory);
          }
        }),
        filter(loaded => !loaded),
        take(1)
      ).subscribe();

    this.categories$ = this.fromCategoryStore.select(fromCategoryStore.getCategories);
  }

  onSubmit() {        
    this.fromArticleStore.dispatch(new fromArticleStore.UpdateArticle(this.model));
  }

  selectFile(event) {
    const file = event.target.files.item(0)

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.url = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      alert('invalid format!');
    }
  }



  _opened: boolean = false;
  _modeNum: number = 0;
  _positionNum: number = 0;
  _dock: boolean = false;
  _closeOnClickOutside: boolean = true;
  _closeOnClickBackdrop: boolean = false;
  _showBackdrop: boolean = false;
  _animate: boolean = true;
  _trapFocus: boolean = true;
  _autoFocus: boolean = true;
  _keyClose: boolean = false;
  _autoCollapseHeight: number = null;
  _autoCollapseWidth: number = null;

  _MODES: Array<string> = ['over', 'push', 'slide'];
  _POSITIONS: Array<string> = ['right', 'left', 'top', 'bottom'];

  _toggleOpened(): void {
    this._opened = !this._opened;
  }

  _toggleMode(): void {
    this._modeNum++;

    if (this._modeNum === this._MODES.length) {
      this._modeNum = 0;
    }
  }

  _toggleAutoCollapseHeight(): void {
    this._autoCollapseHeight = this._autoCollapseHeight ? null : 500;
  }

  _toggleAutoCollapseWidth(): void {
    this._autoCollapseWidth = this._autoCollapseWidth ? null : 500;
  }

  _togglePosition(): void {
    this._positionNum++;

    if (this._positionNum === this._POSITIONS.length) {
      this._positionNum = 0;
    }
  }

  _toggleDock(): void {
    this._dock = !this._dock;
  }

  _toggleCloseOnClickOutside(): void {
    this._closeOnClickOutside = !this._closeOnClickOutside;
  }

  _toggleCloseOnClickBackdrop(): void {
    this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
  }

  _toggleShowBackdrop(): void {
    this._showBackdrop = !this._showBackdrop;
  }

  _toggleAnimate(): void {
    this._animate = !this._animate;
  }

  _toggleTrapFocus(): void {
    this._trapFocus = !this._trapFocus;
  }

  _toggleAutoFocus(): void {
    this._autoFocus = !this._autoFocus;
  }

  _toggleKeyClose(): void {
    this._keyClose = !this._keyClose;
  }

  _onOpenStart(): void {
    console.info('Sidebar opening');
  }

  _onOpened(): void {
    console.info('Sidebar opened');
  }

  _onCloseStart(): void {
    console.info('Sidebar closing');
  }

  _onClosed(): void {
    console.info('Sidebar closed');
  }

  _onTransitionEnd(): void {
    console.info('Transition ended');
  }

  _onBackdropClicked(): void {
    console.info('Backdrop clicked');
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
