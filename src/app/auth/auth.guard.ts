import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private authService : AuthService , private router : Router){}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): 
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean|UrlTree> {
       return this.authService.user.pipe(
        take(1),
        map(User => {
            const isAuth = !!User;
            if(isAuth){
                return isAuth;
            }
            return this.router.createUrlTree(['/auth'])
        }), 
        // tap(isAuth => {
        //     if (!isAuth) {
        //         this.router.navigate(['/auth']);
        //     }
        // })
        );
    }
}