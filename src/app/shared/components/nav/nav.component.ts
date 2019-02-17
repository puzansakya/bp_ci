import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// store and actions
import * as fromAuthStore from '../../../root-store/auth-store';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user$: Observable<User>;
  isShow: boolean;

  constructor(
    private store: Store<fromAuthStore.AuthState>
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(fromAuthStore.getAuthUser);
  }

  logOut(): void {
    this.store.dispatch(new fromAuthStore.Logout);
  }

  toggleNav() {
    this.isShow = !this.isShow;
  }

}
