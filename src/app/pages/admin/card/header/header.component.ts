import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

user=localStorage.getItem('pref');

  constructor(public rout:Router) { }
  ngOnInit(): void {
  }

  salir(){
    localStorage.removeItem('pref');
    this.rout.navigateByUrl('login');
  }
}
