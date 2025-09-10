import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-asdf',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  mode: 'login' | 'register' = 'login'; // default

  protected form: FormGroup;
  protected readonly fb = inject(FormBuilder);

  constructor() {
    this.buildForm();
  }

  buildForm() {
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
      console.log(this.form.value);
    }
  }
}
