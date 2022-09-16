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
  constructor(public auth: CardService) {
    auth.ListarGiftCardCab().subscribe(res=>{
      this.cliente=res;
    });
  }

  ngOnInit(): void {

  }


}
