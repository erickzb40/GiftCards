import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { detalleModulo } from './../../models/detalle';
import { CardService } from 'src/service/card.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-canje',
  templateUrl: './canje.component.html',
  styleUrls: ['./canje.component.css']
})
export class CanjeComponent implements OnInit {
  html = '';
  documento: string = '';
  input: string = '';
  documento_ref='';
  fecha='';
  local_descripcion='';
  monto='';
  serie='';
  id='';
  giftcard: detalleModulo[] = [];
  constructor(public api: CardService, public pipeDate: DatePipe, private modalService: NgbModal) {

  }
  ngOnInit(): void { }

  buscarSerie(modal) {
    Swal.showLoading();
    if (localStorage.getItem('token') == null) { return Swal.fire({ icon: 'warning', text: 'No tiene los permisos configurados vuelva a logearse!' }) }
    var serie = this.input.trim();
    if (serie.length < 1) {
      this.input = '';
      return Swal.fire({ icon: 'warning', text: 'Ingrese el codigo!' })
    } else {
      return this.api.buscarSerie(serie).subscribe((res: any) => {
        Swal.close();
        if (res.length > 0) {
          if (res[0].estado != 1) {
            throw Swal.fire({ icon: 'warning', title: 'GiftCard', text: 'Estado:' + res[0].estado_descripcion });
          } else {
            this.fecha = this.pipeDate.transform(res[0].fecha_vencimiento, 'short');
            this.documento_ref=res[0].documento_ref;
            this.local_descripcion=res[0].local_descripcion;
            this.monto=res[0].monto;
            this.serie=res[0].serie;
            this.id=res[0].id;
            this.modalService.open(modal, { size: 'md', backdrop: 'static', centered: true })
          }
        }
      },error=>{Swal.fire({ icon: 'warning', text: error.error.detail?error.error.detail:'Hubo un error con la conexion'});}
      )
    }
  }
  enviar(f) {
    if (this.documento==''||this.documento.length<8) {
      return Swal.fire({icon:'warning',title:'El documento es requerido!',text:'Debe contener como minimo 8 caracteres'});
    } else {
      Swal.showLoading();
      var obj={dni_canje:this.documento,id:this.id,serie:this.serie};
      this.api.CanjearGiftCard(obj).subscribe(res=>{
        Swal.fire({
          icon:'success',
          title:'Canjeado con exito!'
        }).then((result)=>{
          window.location.reload();
        });
      },error=>{Swal.fire({ icon: 'warning', text: error.error.detail?error.error.detail:'Hubo un error con la conexion'});}
      );
    }
  }
}
