import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthLogin {
  link = "https://localhost:7272/api/giftcards";
  constructor(public http: HttpClient) { }

  login(form: object) {
    return this.http.post(this.link + "/Usuario/usuario", form);
  }
  validarLogin() {
    var token = localStorage.getItem('token');
    if(token!=null||token!=""){
      return false;
    }
    return true;
/*     this.login({ token: token }).subscribe((res: any) => {
      if (Object.entries(res).length > 0) {
        return true;
      } else {
        return false;
      }
    }) */
  }
}
