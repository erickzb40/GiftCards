import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import html2canvas from 'html2canvas';
import { CanvasRenderer } from 'html2canvas/dist/types/render/canvas/canvas-renderer';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {
  numbers:Array<any> = [];

  titulo = 'Como Convertir el contenido de un Div a Imagen en Angular 10';
  imgcreada = false;
  imagenCreada:any;

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



  constructor() {
    this.numbers = Array.from({length:50},(v,k)=>k+1);
   }

  ngOnInit(): void {
  }





  setMonto(monto:number){
    $(".btn-success").each(function() {
    $(this).removeClass("btn-success").addClass("btn-light");
  });
  $("#btn"+monto).removeClass("btn-light").addClass("btn-success");
  }

}
