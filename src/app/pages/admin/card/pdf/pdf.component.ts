import  Swal  from 'sweetalert2';
import { CardService } from 'src/service/card.service';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  imageSrc = '../../../../../assets/dist/img/demo.jpg';
  prueba: any = [];
  canvas: HTMLCanvasElement;
  constructor(public _route: ActivatedRoute, public auth: CardService) {
    auth.buscarDocumento(this._route.snapshot.paramMap.get('documento')!).subscribe((res: any) => {
      this.prueba = res;
    })
  }

  ngOnInit(): void {

  }
  ejecutarPdf() {
    Swal.showLoading();
    let foundObject = this.prueba.find(object => object.estado == 1);
    if(this.prueba.length>0&&foundObject){
      this.prueba.forEach((element: any) => {
        if (element.estado == 1) {
          this.openPDF(Number(element.id))
        }
      });
      Swal.close();
    }
    else{
      Swal.fire({icon:'info',text:'No hay cards activas!'});
    }

  }
  public openPDF(id: number): void {
    let DATA: any = document.getElementById('HtmlData' + id);
    html2canvas(DATA, { scale: 3 }).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('l', 'mm', [208,156]);
      let position = 5;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('giftcard' + id + '.pdf');
    });
  }
}
