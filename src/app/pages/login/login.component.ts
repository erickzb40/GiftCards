import { usuario } from './../models/usuario';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthLogin } from 'src/service/auth.service';
import Swal from'sweetalert2';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import {Md5} from "md5-typescript";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth:AuthLogin,public router:Router) {
   }
  usuario={
    usuario_nombre:'',
    contrasena:''
  } as usuario;

  recordarme:boolean=false;
  cargando: boolean = false;
  ngOnInit(): void {
    if (localStorage.getItem('user')||localStorage.getItem('pass')) {
      this.usuario.usuario_nombre = localStorage.getItem('user')!;
      this.recordarme=true;
    }
  }
  login(form: NgForm) {
    Swal.fire({title: 'Cargando...',focusCancel:false,allowOutsideClick: false});
    Swal.showLoading();
    if (form.invalid) { return  }
    this.auth.login(form.form.value).pipe(finalize(() => {})).subscribe((res:any) => {
      if (Object.entries(res).length > 0)
      {
        if (this.recordarme) {
          localStorage.setItem('user', this.usuario.usuario_nombre);
          localStorage.setItem('recordarme','true');
        }
        Swal.close();
        localStorage.setItem('pref', this.usuario.usuario_nombre);
        this.router.navigateByUrl('cards');
      } else {Swal.fire({title: 'Mensaje',icon: 'warning',text: 'No se encontro ningun usuario'})}
    }, err => {Swal.fire({ icon: 'warning', text: 'hubo un error en la conexion al servidor' });});
  }

}
