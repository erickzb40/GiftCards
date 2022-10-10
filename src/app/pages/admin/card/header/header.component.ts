import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

user=localStorage.getItem('user');

  constructor(public rout:Router) { }
  ngOnInit(): void {
  }

  salir(){
    localStorage.removeItem('user');
    this.rout.navigateByUrl('login');
  }
}
