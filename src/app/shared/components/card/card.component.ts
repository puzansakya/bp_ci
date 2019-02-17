import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { fade } from '../../animations/fade';
import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fade]
})
export class CardComponent implements OnInit {

  @Input() article: any;
  @Output() bookmark: EventEmitter<Article> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleBookmark(article: Article) {
    this.bookmark.emit(article);
  }

}
