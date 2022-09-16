import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

token=localStorage.getItem('gc');

  constructor(public rout:Router) { }
  ngOnInit(): void {
  }

  salir(){
    localStorage.removeItem('gc');
    this.rout.navigateByUrl('login');
  }
}
