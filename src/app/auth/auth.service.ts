import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponseData {
  kind:string;
  idtoken:string;
  email:string,
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}

@Injectable({
  providedIn:'root'
})
export class AuthService {
   key = 'AIzaSyCBG29Bj9NanBZZZV0kChUa88xQe5yt7iA';
   signupUrl ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
   loginUrl ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
  constructor(private http: HttpClient){}

 signup(email:string,password:string){
  console.log("email :"+email+' password :'+password);
  return this.http.post<AuthResponseData>(this.signupUrl+this.key,
  {
    email: email,
    password:password,
    returnSecureToken :true
  }
  ).pipe(
    catchError(this.handleError)
  );
 }

 login(email:string,password:string){
  console.log("email :"+email+' password :'+password);
  return this.http.post<AuthResponseData>(this.loginUrl+this.key,
  {
    email: email,
    password:password,
    returnSecureToken :true
  }
  ).pipe(
    catchError(this.handleError)
  );
 }

 private handleError(errorResponse: HttpErrorResponse){
  console.log(errorResponse);
        let errorMessage = '';
        if(!errorResponse.error || !errorResponse.error.error)
        {
          return throwError(()=>{ return new Error('An Unknown error occurred')});
        }
        switch(errorResponse.error.error.message){
          case 'INVALID_PASSWORD':
            errorMessage= 'The password is Invalid'
          break;
          case 'EMAIL_EXISTS':
            errorMessage= 'This Email Exists'
          break;
          default:
            errorMessage= 'An Unknown error occurred'
          break;
      }
      return throwError(()=>{ return new Error(errorMessage)});
 }

}