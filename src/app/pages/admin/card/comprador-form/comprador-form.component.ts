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

  comprador = {tipo_doc:'',montoTexto:'monto'} as clienteModel;
  locales:any=[];

  constructor(public service:CardService) {}
  @Output() form: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    // this.service.getLocal(this.gc.empresa);
  }

  enviar(f: NgForm) {
    if(!f.invalid){
      this.form.emit(f);
    }}

}
