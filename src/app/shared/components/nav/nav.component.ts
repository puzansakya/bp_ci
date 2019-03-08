import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';

// store and actions
import * as fromAuthStore from '../../../root-store/auth-store';

// models
import { User } from '../../../core/models/user.model';
import { Category } from '../../../core/models/category.model';

// drag scroll
import { DragScrollComponent } from 'ngx-drag-scroll/lib/ngx-drag-scroll';

// rxjs
import { Observable } from 'rxjs';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {  

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

  user$: Observable<User>;
  isShow: boolean;

  hideScrollbar;
  disabled;
  xDisabled;
  yDisabled;
  leftNavDisabled = false;
  rightNavDisabled = false;
  index = 0;

  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  constructor(
    private store: Store<fromAuthStore.AuthState>
  ) {
  }

  ngOnInit() {
    this.user$ = this.store.select(fromAuthStore.getAuthUser);

  }

  logOut(): void {
    this.store.dispatch(new fromAuthStore.Logout);
  }

  toggleNav() {
    this.isShow = !this.isShow;
  }


  clickItem(item) {
    console.log('item clicked');
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
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

}
