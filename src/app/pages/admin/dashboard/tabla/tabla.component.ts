import  Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CardService } from './../../../../../service/card.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  cliente: any = [];
  p: number = 1;
  constructor(public auth: CardService,public rout:Router) {
    auth.ListarGiftCardCab().subscribe(res=>{this.cliente=res;});
  }

  ngOnInit(): void {
  }

  abrirGiftCard(documento:string){
   this.rout.navigateByUrl('pdf/'+documento);
  }
  activarGiftCard(id:number,estado:number){
    Swal.showLoading();
    var form={"id":id,"estado":estado};
    this.auth.ActivarGiftCard(form).subscribe((res:any)=>{
      if(Object.entries(res).length > 0){
        this.auth.ListarGiftCardCab().subscribe(res=>{this.cliente=res;});
        Swal.close();
    }});
  }

}
