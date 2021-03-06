import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authService.userValue;
        if (user) {
            // logged in so return true
            console.log("Passed in auth.guard to confirm access ::: 4", user);
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            this.router.navigate(['/login']);
            return false;
        }
    }
}
