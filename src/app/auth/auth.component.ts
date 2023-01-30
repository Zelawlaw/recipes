import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: any = null;
  @ViewChild(PlaceHolderDirective) alertHost!: PlaceHolderDirective;
  authObs !: Observable<AuthResponseData>; 
  private closeSub!: Subscription;
  
  
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
        this.showErrorAlert(errorResponse);
        console.log('Ze error');
        console.error(errorResponse);
        this.isLoading = false;
      },
    });

    //form.reset();
  }


   private async showErrorAlert(message:string){
   //const alertCompFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
   const hostViewContainerRef = this.alertHost.viewContainerRef;
   hostViewContainerRef.clear();
   //const componentRef = hostViewContainerRef.createComponent(alertCompFactory);
   const componentRef = hostViewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe({next:()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
     }});
   }

   ngOnDestroy(): void {
    
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
    
   }

}
