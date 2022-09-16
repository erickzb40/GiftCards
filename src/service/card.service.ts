import { clienteModel } from './../app/pages/models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  user=localStorage.getItem('usuario_nombre');
  pass=localStorage.getItem('pass');
  localhost='https://localhost:7292/api/'
  constructor(public http:HttpClient) { }
  getLocal(){
    return this.http.get(this.localhost+'local?a='+this.user+'&p='+this.pass);
  }
  CrearGiftCard(form: clienteModel) {
    return this.http.post(this.localhost+'giftcardcabs?user='+this.user+'&pass='+this.pass, form);
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
}
