import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Category } from '../../../core/models/category.model';

// store
import { Store } from '@ngrx/store';
import * as fromCategoryStore from './../../../root-store/category-store';

// rxjs
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-category',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @ViewChild('f') form: any;

  categories$: Observable<Category[]>;
  loading$: Observable<boolean>;

  categories: Category[] = [{
    id: 7,
    category: 'category 1'
  }, {
    id: 2,
    category: 'category 2'
  }]
  model: Category = {};
  isEdit: boolean;

  constructor(private store: Store<fromCategoryStore.CategoryState>) { }

  ngOnInit() {
    this.store.dispatch(new fromCategoryStore.LoadCategory);
    this.categories$ = this.store.select(fromCategoryStore.getCategories)
    this.loading$ = this.store.select(fromCategoryStore.getCategoriesLoading);
    // this.categories$ = of(this.categories);
  }

  public showEditForm(category) {
    this.isEdit = true;
    this.model = category;
  }

  public showAddForm() {
    this.isEdit = false;
  }

  onCreate(event: Category) {
    this.store.dispatch(new fromCategoryStore.CreateCategory(event));
  }

  onUpdate(event: Category) {
    this.store.dispatch(new fromCategoryStore.updatecategory(event));
  }

  // public async onSubmit() {
  //   try {
  //     if (this.form.valid) {
  //       if (!this.isEdit) {
  //         //save          
  //         console.log("Add method", this.model);
  //         // this.store.dispatch(new fromCategoryStore.CreateCategory(this.model));
  //         this.categories.unshift(this.model);
  //         this.reset();

  //       } else {
  //         //update
  //         console.log("Update method", this.model);
  //         // this.store.dispatch(new fromCategoryStore.updatecategory(this.model));
  //       }
  //     }
  //   } catch (error) {
  //     console.error('ERROR: ', error.message);
  //   }

  // }

  // public async onChange(category: string) {
  //   console.log(category);
  //   this.model.category = 'asdf';
  // }

  // public async onDelete() {
  //   try {
  //     this.reset();
  //     this.isEdit = false;
  //     this.categories.splice(this.categories.indexOf(this.model, 1));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  // private reset() {
  //   this.model = {}
  //   this.form.reset();
  // }


}
