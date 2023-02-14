import Swal from 'sweetalert2';
import { CardService } from 'src/service/card.service';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-tabla-detalles',
  templateUrl: './tabla-detalles.component.html',
  styleUrls: ['./tabla-detalles.component.css']
})
export class TablaDetallesComponent implements OnInit {
  p=0;
  desde=this.fechaActual();
  hasta=this.fechaActual();
  detalles=[];
  constructor(public api:CardService) {
    this.getDetalles();

  }

  ngOnInit(): void {

   }
  fechaActual() {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  getDetalles(){
    Swal.showLoading();
   return this.api.getDetalles(this.desde,this.hasta).subscribe((res:any)=>{
    Swal.close();
      this.detalles=res;
    })
  }
  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.detalles);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'reporte_cabecera.xlsx');
}
}
