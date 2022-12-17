import { detalleModulo } from './../../models/detalle';
import { CardService } from 'src/service/card.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { empty } from 'rxjs';
import { icon } from '@fortawesome/fontawesome-svg-core';
@Component({
  selector: 'app-canje',
  templateUrl: './canje.component.html',
  styleUrls: ['./canje.component.css']
})
export class CanjeComponent implements OnInit {
  input: string = '';
  giftcard: detalleModulo[] = [];
  constructor(public api: CardService, public pipeDate: DatePipe) {

  }
  ngOnInit(): void {}
  buscarSerie() {
    Swal.showLoading();
    if(localStorage.getItem('token')==null)
    {return Swal.fire({icon:'warning',text:'No tiene los permisos configurados vuelva a logearse!'})}
    var serie = this.input.trim();
    if (serie.length < 1) {
      this.input = '';
      return Swal.fire({ icon: 'warning', text: 'Ingrese el codigo!' })
    } else {
      return this.api.buscarSerie(serie).subscribe((res: any) => {
        console.log(res);
        if (res.length > 0) {
          if(res[0].estado!=1){
            throw Swal.fire({icon:'warning',title:'GiftCard',text:'Estado:'+res[0].estado_descripcion});
          }else{
          res[0].nombre_usuario=localStorage.getItem('token');
          this.giftcard=res;
          this.giftcard[0].estado=2;
          var fecha = this.pipeDate.transform(res[0].fecha_vencimiento, 'short');
          Swal.fire({
            title: '<b>GiftCard</b>',
            html: '<b>Documento: ' + res[0].documento_ref + '</b><br>' +
              '<b>Expira: ' + fecha + '</b><br>' +
              '<b>Local: ' + res[0].local_descripcion + '</b><br>' +
              '<b>Importe: S/' + res[0].monto + '</b><br>' +
              '<b>Serie: ' + res[0].serie + '</b>',
              confirmButtonText: 'Canjear',
              showDenyButton:true,
              denyButtonText:'Cancelar',
              confirmButtonColor: '#3085d6',
              reverseButtons:true
          }).then((result) => {if (result.isConfirmed) {
            this.api.CanjearGiftCard(this.giftcard[0]).subscribe(res=>{
            console.log(res);
            });
            Swal.fire('Canjeado con exito!', '', 'success');
          }})}
        } else {Swal.fire({ icon: 'warning', text: 'No se encontro ningun giftcard con esa serie!' })}
      },error=>{Swal.fire({icon:'warning',text:'Hubo un problema de conexion'})});
    }
  }
}
