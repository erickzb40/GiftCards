import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { clienteModel } from 'src/app/pages/models/cliente';
@Component({
  selector: 'app-comprador-form',
  templateUrl: './comprador-form.component.html',
  styleUrls: ['./comprador-form.component.css']
})
export class CompradorFormComponent implements OnInit {


  constructor() { }
  Cliente = {} as clienteModel;
  @Output() form: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }
  comprador = {} as clienteModel;
  enviar(f: NgForm) {
    if(!f.invalid){
      this.form.emit(f);
    }}
}
