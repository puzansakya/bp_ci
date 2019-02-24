import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent implements OnInit {

  @Input() article: any;
  @Output() bookmark: EventEmitter<Article> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
