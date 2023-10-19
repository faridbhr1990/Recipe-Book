import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoading = false ;
  loggedIn = true ;
  error : string = '';

  constructor(private  authService : AuthService , private router : Router){} 

  OnSubmit(form : NgForm){
    
    const myform = form.value ;
    const email = form.value.email ;
    const password = form.value.password ;
    let authObs : Observable<AuthResponse>;
    this.isLoading = true;
    if(!this.loggedIn){
      authObs = this.authService.signUp(email , password);
      this.switching();
    }
    else {
      authObs = this.authService.logIn(email , password);
    }
    form.reset();
    authObs.subscribe(
      resData => {
      console.log(resData);
      this.router.navigate(['/recipes']);
      this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    )
    
  }
  switching(){
    this.loggedIn = !this.loggedIn;
  }

  onHandleError() {
    this.error = '';
  }

}
