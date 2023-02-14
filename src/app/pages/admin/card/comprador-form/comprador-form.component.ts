import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { clienteModel } from 'src/app/pages/models/cliente';
import { CardService } from 'src/service/card.service';
@Component({
  selector: 'app-comprador-form',
  templateUrl: './comprador-form.component.html',
  styleUrls: ['./comprador-form.component.css']
})
export class CompradorFormComponent implements OnInit {
  comprador = { tipo_doc: '01', montoTexto: 'monto',fecha_vencimiento: this.fechaActual() } as clienteModel;
  locales: any = [];

  constructor(public service: CardService) { }
  @Output() form: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    // this.service.getLocal(this.gc.empresa);
  }

  enviar(f: NgForm) {
    if (!f.invalid) {
      this.form.emit(f);
    }
  }
  fechaActual() {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
