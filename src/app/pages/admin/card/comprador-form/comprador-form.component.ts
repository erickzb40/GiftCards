import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Comprador } from 'src/models/comprador';
@Component({
  selector: 'app-comprador-form',
  templateUrl: './comprador-form.component.html',
  styleUrls: ['./comprador-form.component.css']
})
export class CompradorFormComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
  comprador:Comprador={
    nombre:'',
    tipo_doc:'',
    num_doc:undefined,
    telefono:undefined,
    documento:'',
    correo:''
  }
  enviar(f: NgForm){

  }

}
