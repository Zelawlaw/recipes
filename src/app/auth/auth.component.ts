import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: any = null;

  authObs !: Observable<AuthResponseData>; 
  constructor(private router:Router,private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
    this.authObs =  this.authService.login(email, password);
    } else {
     this.authObs =  this.authService.signup(email, password);
    }

    this.authObs.subscribe({
      next: (v) => {
        console.log(v);
        this.isLoading = false;
        this.error = null;
        if(this.isLoginMode){
          this.router.navigate(['/recipes']);
        }else {
          this.router.navigate(['/auth']);
        }
        
      },
      error: (errorResponse) => {
        this.error = errorResponse;
        console.log('Ze error');
        console.error(errorResponse);
        this.isLoading = false;
      },
    });

    //form.reset();
  }
}
