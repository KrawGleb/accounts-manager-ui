import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { RegistrationRequest } from '../models/registration-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = 'https://accounts-manager-api.herokuapp.com/api';

  constructor(
    private readonly httpClient: HttpClient) {}

  public register(registrationRequest: RegistrationRequest): Observable<any> {
    return this.httpClient.post(
      this.BASE_URL + '/auth/register',
      registrationRequest
    );
  }

  public login(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + '/auth/login', loginRequest)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('my_id', response.id);
        })
      );
  }
}
