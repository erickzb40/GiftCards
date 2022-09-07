import { clienteModel } from 'src/app/pages/models/cliente';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthLogin {
  localhost="https://localhost:7292/api/giftcardcabs";
  constructor(public http:HttpClient) { }

  login(usuario:any){
  return this.http.get("https://localhost:7292/api/giftcards/Usuario/usuario?usuario="+usuario.usuario_nombre+"&contrasena="+usuario.contrasena);
  }
  CrearGiftCard(form:clienteModel){
    return this.http.post(this.localhost,form)
  }
  ListarGiftCardCab(){
    return this.http.get("https://localhost:7292/api/giftcardcabs");
  }
}
