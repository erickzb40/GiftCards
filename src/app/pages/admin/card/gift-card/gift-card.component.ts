import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import html2canvas from 'html2canvas';
import { CanvasRenderer } from 'html2canvas/dist/types/render/canvas/canvas-renderer';
import {AuthLogin} from './../../../../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {
  numbers: Array<any> = [];
  importe:number=0;
  cantidad:number=1;
  titulo = 'Como Convertir el contenido de un Div a Imagen en Angular 10';
  imgcreada = false;
  imagenCreada: any;

  crearImagen() {
    html2canvas(document.querySelector("#contenido")!).then(canvas => {
      var a = document.createElement('a');
      canvas.getContext('2d');
      a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
      a.download = 'somefilename.jpg';
      a.click();
    });
    this.imgcreada = true;

  }
  constructor(public auth:AuthLogin) {
    this.numbers = Array.from({ length: 50 }, (v, k) => k + 1);
  }
  ngOnInit(): void {
  }
  enviarForm($event:NgForm) {
   if(!$event.invalid){
    $event.value.importe=this.importe;
    $event.value.cantidad=this.cantidad;
    console.log($event.value);
    this.auth.CrearGiftCard($event.value).subscribe((res:any)=>{
    if(res.documento){
      Swal.fire({icon:'success',text:'Se creo con exito'});
    }
    },error=>{
      Swal.fire({icon:'warning',text:'Hubo un error en la conexion'});
    });
   }}
  setMonto(monto: number) {
    $(".btn-success").each(function () {
      $(this).removeClass("btn-success").addClass("btn-light");
    });
    $("#btn" + monto).removeClass("btn-light").addClass("btn-success");
    this.importe=monto;
  }
  inputClass(){
    $(".btn-success").each(function () {
      $(this).removeClass("btn-success").addClass("btn-light");
    });
  }
}
