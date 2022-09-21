import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import html2canvas from 'html2canvas';
import { CardService } from './../../../../../service/card.service';
import Swal from 'sweetalert2';
import { EmailService } from 'src/service/email.service';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {
  numbers: Array<any> = [];
  importe: number = 0;
  cantidad: number = 1;
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
  constructor(public auth: CardService, public router:Router,public email:EmailService) {
    this.numbers = Array.from({ length: 50 }, (v, k) => k + 1);
  }
  ngOnInit(): void {
  }
  enviarForm($event: NgForm) {
    if (!$event.invalid) {
      $event.value.importe = this.importe;
      $event.value.cantidad = this.cantidad;
      this.auth.CrearGiftCard($event.value).subscribe((res: any) => {
          Swal.fire({ icon: 'success', text: 'Se genero con exito, desea descargarlo como PDF?', confirmButtonText: 'Si', showDenyButton: true }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigateByUrl('pdf/'+$event.value.documento);
            } else if (result.isDenied) {
            }
          });
      }, (error:any) => {
        Swal.fire({ icon: 'warning', text: error.error.detail?error.error.detail:'Hubo un error con la conexion'});
      });
    }
  }
  setMonto(monto: number) {
    $(".btn-success").each(function () {
      $(this).removeClass("btn-success").addClass("btn-light");
    });
    $("#btn" + monto).removeClass("btn-light").addClass("btn-success");
    this.importe = monto;
  }
  inputClass() {
    $(".btn-success").each(function () {
      $(this).removeClass("btn-success").addClass("btn-light");
    });
  }
}
