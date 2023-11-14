import { Injectable } from "@angular/core";
import { HttpClient , HttpErrorResponse} from "@angular/common/http";
import { BehaviorSubject, catchError, throwError} from "rxjs";
import { tap } from "rxjs/operators"
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.development";

export interface AuthResponse {
    idToken	: string;	
    email	: string;	
    refreshToken :	string;	
    expiresIn : 	string;	
    localId	: string;
    registered ?: boolean ;
}

@Injectable({providedIn:'root'})
export class AuthService {
    user = new BehaviorSubject<User | null>(null);
    tokenExpirationTimer : any ;
    constructor(private http : HttpClient , private router : Router){}


    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }

    autoLogout(expirationDuration : number){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout();
        },expirationDuration);
    }
    
    signUp(email : string , password: string){
        return this.http.post<AuthResponse>( 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey , 
        {
            email: email ,
            password : password ,
            returnSecureToken : true 
        }).pipe(catchError(this.handleError) , tap(resData => { 
            this.handleAuthentication(resData.email , resData.localId ,resData.idToken , +resData.expiresIn) 
        }))
    }

    logIn(email: string , password: string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
        {
            email: email ,
            password : password ,
            returnSecureToken : true 
        }
        ).pipe(catchError(this.handleError) , tap(resData => { 
            this.handleAuthentication(resData.email , resData.localId ,resData.idToken , +resData.expiresIn) 
        }));
    }

    autoLogin() {
        const userDataString = localStorage.getItem('userData');
      
        if (userDataString !== null) {
          const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string,
          } = JSON.parse(userDataString);
      
          const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      
          if (loadedUser.token) {
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
            this.user.next(loadedUser);
          }
        }
      }
      

    private handleAuthentication (email:string , userId:string ,token:string , expiresIn: number) {
        const expirationDate = 
        new Date(new Date().getTime() + expiresIn*1000); 
        const user = 
        new User(
            email , 
            userId , 
            token , 
            expirationDate 
            );
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData' , JSON.stringify(user));
    }

    private handleError(errorRes : HttpErrorResponse){       
        let errorMessage = 'An Error Occured!'
                if(!errorRes.error || !errorRes.error.error){
                    return throwError(errorMessage);
                }
                switch(errorRes.error.error.message) {
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER' :
                    errorMessage = 'Too Many Attempts , Try Again Later';
                    break;
                    case 'EMAIL_NOT_FOUND':
                    errorMessage = 'Invalid Username or Password';
                    break;
                    case 'INVALID_PASSWORD':
                    errorMessage = 'Invalid Username or Password';
                    break;
                    case 'INVALID_LOGIN_CREDENTIALS' : 
                    errorMessage = 'Invalid Username or Password' ;
                    break;
                    case 'EMAIL_EXISTS' : 
                    errorMessage = 'Email Is Exists , Use New Email or Try to LogIn';
                    break;
                }
                return throwError(errorMessage);
    }
}