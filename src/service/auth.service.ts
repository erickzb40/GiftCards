import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthLogin {

  constructor(public http:HttpClient) { }

  login(usuario:any){
  return this.http.get("https://localhost:7292/api/giftcards/Usuario/usuario?usuario="+usuario.usuario_nombre+"&contrasena="+usuario.contrasena);
  }
}
