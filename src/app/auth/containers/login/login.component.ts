import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// store
import { Store } from '@ngrx/store';
import * as fromAuthStore from '../../../root-store/auth-store';

import { Observable } from 'rxjs';

@Component({
  templateUrl: 'login.component.html',
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 60px 0;
      }    

      .loginError {
        padding: 16px;
        width: 300px;
        color: white;
        background-color: red;
      }

      .loginButtons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading$: Observable<boolean>;
  submitted = false;
  returnUrl: string;
  error = '';

  getState: Observable<any>;
  // isAuthenticated: false;
  user = null;
  errorMessage = null;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromAuthStore.AuthState>    
  ) {
    this.store.dispatch(new fromAuthStore.Redirect);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loading$ = this.store.select(fromAuthStore.getAuthLoading);

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const payload = {
      email: this.f.email.value,
      password: this.f.password.value
    };
    
    this.store.dispatch(new fromAuthStore.Login(payload));
  }

  
}
