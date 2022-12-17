import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

token=localStorage.getItem('token');

  constructor(public rout:Router) { }
  ngOnInit(): void {
  }

  salir(){
    localStorage.removeItem('token');
    this.rout.navigateByUrl('login');
  }
}
