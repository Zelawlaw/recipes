import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  key = 'AIzaSyCBG29Bj9NanBZZZV0kChUa88xQe5yt7iA';
  signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  loginUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  dummyUser = new User('null', 'null', 'null', new Date(0, 1, 0));
  user = new BehaviorSubject<User>(this.dummyUser);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    console.log('email :' + email + ' password :' + password);
    return this.http
      .post<AuthResponseData>(this.signupUrl + this.key, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    console.log('email :' + email + ' password :' + password);
    return this.http
      .post<AuthResponseData>(this.loginUrl + this.key, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userDataStr = localStorage.getItem('userData');
    if (!userDataStr) {
      return;
    }
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(userDataStr);

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.user.next(loadedUser);
      this.autoLogout(expirationDuration);
    }
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(this.dummyUser);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log('expirationDuration:'+expirationDuration)
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
    console.log('expiration Timer :'+this.tokenExpirationTimer);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    let errorMessage = '';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => {
        return new Error('An Unknown error occurred');
      });
    }
    switch (errorResponse.error.error.message) {
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is Invalid';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email Exists';
        break;
      default:
        errorMessage = 'An Unknown error occurred';
        break;
    }
    return throwError(() => {
      return new Error(errorMessage);
    });
  }
}
