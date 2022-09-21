import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'acm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  public errorMessages: string[] = [];

  public formGroup = new FormGroup({
    Name: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    ConfirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get password() {
    return this.formGroup.get('Password');
  }

  get confirmPassword() {
    return this.formGroup.get('ConfirmPassword');
  }

  public register() {
    let request = {
      Name: this.formGroup.value.Name,
      Email: this.formGroup.value.Email,
      Password: this.formGroup.value.Passwords.Password,
    };

    this.authService
      .register(request)
      .pipe(
        tap((response) => {
          this.authService
            .login({
              Email: this.formGroup.value.Email,
              Password: this.formGroup.value.Passwords.Password,
            })
            .pipe(tap(() => this.router.navigateByUrl('/table')))
            .subscribe();
        }),
        catchError((err) => {
          if (err.status === 400) {
            this.errorMessages.push(err.error);
          }

          return of();
        })
      )
      .subscribe();
  }
}
