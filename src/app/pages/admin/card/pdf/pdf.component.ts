import { CardService } from 'src/service/card.service';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { EmailService } from 'src/service/email.service';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  prueba: any = [];
  constructor(public _route: ActivatedRoute, public auth: CardService, public email: EmailService) {
    auth.buscarDocumento(this._route.snapshot.paramMap.get('documento')!).subscribe((res: any) => {
      this.prueba = res;
    })
  }

  ngOnInit(): void {

  }
  ejecutarPdf() {
    this.prueba.forEach((element: any) => {
      if (element.estado == 1) {
        this.openPDF(Number(element.id));
      }
    });
  }
  public openPDF(id: number): void {
    let DATA: any = document.getElementById('HtmlData' + id);
    html2canvas(DATA, { scale: 3 }).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 5;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('giftcard' + id + '.pdf');
    });
  }
  enviarCorreo() {
    this.email.enviarEmail();
  }
}
