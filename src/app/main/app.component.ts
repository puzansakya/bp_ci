import { Component } from '@angular/core';

// store and actions
import { Store } from '@ngrx/store';
import * as fromAuthStore from '../root-store/auth-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'puzanssr';

  constructor(
    private store: Store<fromAuthStore.AuthState>
  ) {
    this.store.dispatch(new fromAuthStore.Authenticated);
  }
}
