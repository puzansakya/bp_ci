import { Component, OnInit } from '@angular/core';
import { Article } from '../../../core/models/article.model';

// store
import { Store } from '@ngrx/store';
import * as fromArticleStore from './../../../root-store/article-store';
import * as fromCategoryStore from '../../../root-store/category-store';
import { tap, take, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from '../../../core/models/category.model';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  // fileupload variables
  selectedFiles: FileList;
  currentFileUpload: File = null;
  url: string = "http://i.pravatar.cc/500?img=7";

  categories$: Observable<Category[]>;

  model: Article = {
    category_id: null,
  };
  constructor(
    public store: Store<fromArticleStore.ArticleState>,
    public fromCategoryStore: Store<fromCategoryStore.CategoryState>
  ) { }

  ngOnInit() {
    this.fromCategoryStore.select(fromCategoryStore.getCategoriesLoaded)
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.store.dispatch(new fromCategoryStore.LoadCategory);
          }
        }),
        filter(loaded => !loaded),
        take(1)
      ).subscribe();
    // this.store.dispatch(new fromCategoryStore.LoadCategory);
    this.categories$ = this.fromCategoryStore.select(fromCategoryStore.getCategories);
  }

  onSubmit() {

    let filename = '';
    if (this.selectedFiles != undefined) {
      this.currentFileUpload = this.selectedFiles.item(0);
    }
    // console.log(this.model);
    this.store.dispatch(new fromArticleStore.CreateArticle({ article: this.model, buffer: this.currentFileUpload }));
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

}
