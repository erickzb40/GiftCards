import { clienteModel } from './../app/pages/models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  user=localStorage.getItem('user');
  localhost='https://localhost:7272/api/';
  token=localStorage.getItem('token');
  constructor(public http:HttpClient) { }
  CrearGiftCard(form: any) {
    form.token=localStorage.getItem('token');
    return this.http.post(this.localhost+'giftcardcabs', form);
  }
  ListarGiftCardCab() {
    return this.http.get(this.localhost+"giftcardcabs"+'?token='+this.token);
  }
  buscarDocumento(documento:string){
    return this.http.get(this.localhost+'giftcarddets/'+documento+'?token='+this.token);
  }
  buscarSerie(serie:string){
    return this.http.get(this.localhost+'giftcarddets/serie/'+serie+'?token='+this.token);
  }
  CanjearGiftCard(form:any){
    form.token=localStorage.getItem('token');
    return this.http.put(this.localhost+'giftcarddets',form);
  }
  ActivarGiftCard(form:any){
    form.token=localStorage.getItem('token');
    return this.http.put(this.localhost+'giftcardcabs',form);
  }
}
