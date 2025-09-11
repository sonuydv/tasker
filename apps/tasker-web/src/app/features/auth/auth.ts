import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApi } from './api/auth.api';
import { finalize, tap } from 'rxjs';
import { LocalStore } from '../../util/local.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asdf',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  providers: [AuthApi],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  mode: 'login' | 'register' = 'login'; // default

  protected form: FormGroup;
  private readonly fb = inject(FormBuilder);
  private authApi = inject(AuthApi);
  private localStore = inject(LocalStore);
  private router = inject(Router);

  protected isLoading = signal<boolean>(false);

  constructor() {
    this.buildForm();
  }

  buildForm()   {
    if (this.mode === 'register') {
      this.form = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(4)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    } else {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
    }
  }

  switchMode(newMode: 'login' | 'register') {
    this.mode = newMode;
    this.buildForm();
  }

  onSubmit() {
    if (this.form?.valid) {
      this.isLoading.set(true);
      if (this.mode === 'register') {
        this.authApi
          .register(this.form.value)
          .pipe(
            finalize(() => {
              this.isLoading.set(false);
            }),
            tap((userInfo) => {
              this.localStore.setSessionData(userInfo);
              this.router.navigateByUrl('/');
            })
          )
          .subscribe();
      } else {
        const { email, password } = this.form.value;
        this.authApi
          .login(email, password)
          .pipe(
            finalize(() => {
              this.isLoading.set(false);
            }),
            tap((userInfo) => {
              this.localStore.setSessionData(userInfo);
              this.router.navigateByUrl('/');
            })
          )
          .subscribe();
      }
    }
  }
}
