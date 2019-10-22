import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  constructor (private authService:AuthService, private router:Router){

  }

  canActivate() {
    if(!this.authService.loggedIn()){
      return true;

    } else {
      // this.router.navigate(['/login']);
      return this.router.navigate(['/dashboard']);
    }
  }
  
}
