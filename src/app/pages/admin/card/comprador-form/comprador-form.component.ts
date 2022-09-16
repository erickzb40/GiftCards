import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { clienteModel } from 'src/app/pages/models/cliente';
import { CardService } from 'src/service/card.service';
@Component({
  selector: 'app-comprador-form',
  templateUrl: './comprador-form.component.html',
  styleUrls: ['./comprador-form.component.css']
})
export class CompradorFormComponent implements OnInit {

  comprador = {
    tipo_doc:'',
    cantidad:2,
    correo:'asd',
    descripcion:'',
    documento:'F01-23',
    importe:20,
    montoTexto:'monto',
    telefono:123,
    num_doc:123,
    nombre:'erick',
  } as clienteModel;
  locales:any=[];
  local="";

  constructor(public service:CardService) {
    service.getLocal().subscribe(res=>{
      this.locales=res;
    });
   }
  @Output() form: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    // this.service.getLocal(this.gc.empresa);
  }

  enviar(f: NgForm) {
    if(!f.invalid){
      this.form.emit(f);
    }}

}
