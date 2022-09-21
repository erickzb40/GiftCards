import { clienteModel } from './../app/pages/models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  user=localStorage.getItem('pref');
  // token=CryptoJS.AES.encrypt(this.user+'-'+this.pass, 'jkreservas').toString();
  localhost='https://localhost:7292/api/'
  constructor(public http:HttpClient) { }
  CrearGiftCard(form: clienteModel) {
    return this.http.post(this.localhost+'giftcardcabs?us='+this.user, form);
  }
  ListarGiftCardCab() {
    return this.http.get(this.localhost+"giftcardcabs");
  }
  buscarDocumento(documento:string){
    return this.http.get(this.localhost+'giftcarddets/'+documento);
  }
  buscarSerie(serie:string){
    return this.http.get(this.localhost+'giftcarddets/serie/'+serie);
  }
  CanjearGiftCard(form:any){
    return this.http.put(this.localhost+'giftcarddets',form);
  }
  ActivarGiftCard(form:any){
    return this.http.put(this.localhost+'giftcardcabs',form);
  }
}
