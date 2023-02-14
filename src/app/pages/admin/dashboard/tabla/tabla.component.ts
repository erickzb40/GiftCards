import  Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component,  EventEmitter,  OnInit, Output } from '@angular/core';
import { CardService } from './../../../../../service/card.service';
import * as XLSX from 'xlsx';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  private _isLoading: true;
  public get isLoading(): true {
    return this._isLoading;
  }
  public set isLoading(value: true) {
    this._isLoading = value;
  }
  @Output() ejecutarFuncion = new EventEmitter<void>();
  cabecera: any = [];
  desde=this.fechaActual();
  hasta=this.fechaActual();
  estado=0;
  documento='';
  id=0;
  p: number = 1;

  constructor(public api: CardService,public rout:Router,private modalService: NgbModal) {
    api.ListarGiftCardCab().subscribe(res=>{this.cabecera=res;});
  }
  ngOnInit(): void {
  }

  abrirGiftCard(documento:string){
   this.rout.navigateByUrl('pdf/'+documento);
  }
  asignarDocumento(id:number,estado:number,contenido){
    this.modalService.open(contenido, { size: 'md', backdrop: 'static',centered:true });
    this.id=id;
    this.estado=estado;
    this.documento=this.documento;
  }
  activarGiftcard(f){
    if (f.invalid) { return; }
    var form={"id":this.id,"estado":this.estado,"documento":this.documento};
    Swal.showLoading();
    this.api.ActivarGiftCard(form).subscribe((res:any)=>
    {
      this.modalService.dismissAll();
      this.api.ListarGiftCardCab().subscribe(res=>{this.cabecera=res;});
      Swal.fire({icon:'success',title:'Se activó con éxito'}).then((result)=>{
        window.location.reload();
      });
    },
    error=>{Swal.fire({ icon: 'warning', text: error.error.detail?error.error.detail:'Hubo un error con la conexion'});
    }
    );
  }
  fechaActual() {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  exportToExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.cabecera);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'reporte_cabecera.xlsx');
  }
  enviarCorreo(id){
      Swal.showLoading();
      this.api.enviarCorreo(id).subscribe((res)=>{
        Swal.fire({icon:'success',title:'Enviado',text:'Se han enviado un total de '+res+' giftcards activos!'});
      }), err => {
        if (err.error.detail) { Swal.fire({ icon: 'warning', text: err.error.detail }); }
        else { Swal.fire({ icon: 'warning', text: 'Hubo un error en la conexión' }); }
      }
  }
}
