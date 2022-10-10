
import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private ruta :Router){
}
  canActivate() {
    if(localStorage.getItem('pref')){
     return true;
    }else{
    return this.ruta.navigateByUrl('login');
    }
  }

}
