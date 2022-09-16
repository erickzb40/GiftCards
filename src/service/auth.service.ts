import { clienteModel } from 'src/app/pages/models/cliente';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthLogin {
  localhost = "https://localhost:7292/api/giftcardcabs";
  constructor(public http: HttpClient) { }

  login(usuario: any) {
    return this.http.get("https://localhost:7292/api/giftcards/Usuario/usuario?usuario=" + usuario.usuario_nombre + "&contrasena=" + usuario.contrasena);
  }
   validarLogin() {
    var v=false;
    var usuario = localStorage.getItem('usuario_nombre');
    var pass = localStorage.getItem('pass');
    this.login({ usuario_nombre: usuario, contrasena: pass }).subscribe((res: any) => {
      if (Object.entries(res).length > 0) {
        v=true;
      } else {
        v=false;
      }
    })
    return v;
  }
}
