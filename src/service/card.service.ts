import { clienteModel } from './../app/pages/models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  user=localStorage.getItem('user');
  localhost='https://localhost:7272/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  };
  constructor(public http:HttpClient) { }
  CrearGiftCard(form: any) {
    return this.http.post(this.localhost+'giftcardcabs', form,this.httpOptions);
  }
  ListarGiftCardCab() {
    return this.http.get(this.localhost+"giftcardcabs",this.httpOptions);
  }
  buscarDocumento(documento:string){
    return this.http.get(this.localhost+'giftcarddets/'+documento,this.httpOptions);
  }
  buscarSerie(serie:string){
    return this.http.get(this.localhost+'giftcarddets/serie/'+serie,this.httpOptions);
  }
  CanjearGiftCard(form:any){
    return this.http.put(this.localhost+'giftcarddets',form,this.httpOptions);
  }
  ActivarGiftCard(form:any){
    return this.http.put(this.localhost+'giftcardcabs',form,this.httpOptions);
  }
  getDetalles(desde,hasta){
    return this.http.get(this.localhost+'giftcarddets?desde='+desde+'&hasta='+hasta,this.httpOptions);
  }
  enviarCorreo(id){
    return this.http.get(this.localhost+'Email?id='+id,this.httpOptions);
  }
  updateCabeceraDocumento(doc,id){
    return this.http.get(this.localhost+'update_doc?factura='+doc+'&id='+id,this.httpOptions);
  }
}
