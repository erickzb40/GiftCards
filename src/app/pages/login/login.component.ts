import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthLogin } from 'src/service/auth.service';
import Swal from'sweetalert2';
import { Router } from '@angular/router';
import { trim } from 'lodash';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = {
    nombreUsuario: '',
    contrasena: '',
    empresa:''
  }
  constructor(public auth:AuthLogin,public router:Router) {
   }


  recordarme:boolean=false;
  cargando: boolean = false;
  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.usuario.empresa=localStorage.getItem('emp')!;
      this.usuario.nombreUsuario = localStorage.getItem('user')!;
      this.recordarme=true;
    }
  }
/*   login(form: NgForm) {
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
  } */
  login(form: NgForm) {
    Swal.fire({
      title: 'Cargando...',
      focusCancel:false,
      allowOutsideClick: false
    });
    Swal.showLoading();
    if (form.invalid) { return Swal.fire({icon:'warning',text:'Ingrese sus datos correctamente!'}); }
    var formulario:any=this.usuario;
    formulario.empresa=trim(formulario.empresa).toLowerCase();
    formulario.nombreUsuario=trim(formulario.nombreUsuario).toLowerCase();
    formulario.contrasena=trim(formulario.contrasena).toLowerCase();
    this.auth.login(formulario).subscribe((res:any) => {
      if (Object.entries(res).length > 0) {
        if (this.recordarme) {
          localStorage.setItem('user', this.usuario.nombreUsuario);
          localStorage.setItem('emp', this.usuario.empresa.toLowerCase());
        }else{
          localStorage.removeItem('user');
          localStorage.removeItem('emp');
        }
        Swal.close();
        localStorage.setItem('token',res.token);
        localStorage.setItem('emp',this.usuario.empresa.toLowerCase());
        this.router.navigateByUrl('cards');
      } else {
        Swal.fire({
          title: 'Mensaje',
          icon: 'warning',
          text: 'No se encontro ningun usuario'
        })
      }
    },  err => {
      if (err.error.detail) { Swal.fire({ icon: 'warning', text: err.error.detail }); }
      else { Swal.fire({ icon: 'warning', text: 'Hubo un error al crear el registro' }); }
    });
  }
}
