import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Category } from '../../../core/models/category.model';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnChanges {
  exists = false;

  @Input() category: Category;
  @Input() isEdit: boolean;

  @Output() create = new EventEmitter<Category>();
  @Output() update = new EventEmitter<Category>();
  @Output() remove = new EventEmitter<Category>();

  form = this.fb.group({
    category: ['asd', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  get categoryControl() {
    return this.form.get('category') as FormControl;
  }

  get categoryControlInvalid() {
    return this.categoryControl.hasError('required') && this.categoryControl.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.category && this.category.id) {
      this.exists = true;
      this.form.patchValue(this.category);
    }
    if (!this.isEdit) {
      this.form.reset();
    }
  }

  createCategory(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
      this.form.reset();
    }
  }

  updateCategory(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.category, ...value });
    }
  }

  removeCategory(form: FormGroup) {
    const { value } = form;
    this.remove.emit({ ...this.category, ...value });
  }
}
