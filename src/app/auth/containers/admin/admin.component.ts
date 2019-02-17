import { Component, OnInit } from '@angular/core';

// store
import { Store } from '@ngrx/store';
import * as fromAuthStore from '../../../root-store/auth-store';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user$: Observable<User>;

  constructor(private store: Store<fromAuthStore.AuthState>) {
    this.store.dispatch(new fromAuthStore.Authenticated);
  }

  ngOnInit() {
    this.user$ = this.store.select(fromAuthStore.getAuthUser);
  }

  logout() {
    this.store.dispatch(new fromAuthStore.Logout);
  }
}
