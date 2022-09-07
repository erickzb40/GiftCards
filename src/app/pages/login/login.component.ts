import { usuario } from './../models/usuario';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthLogin } from 'src/service/auth.service';
import Swal from'sweetalert2';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth:AuthLogin,public router:Router) { }
  usuario:usuario={
    id:undefined,
    usuario_nombre:'',
    nombre:'',
    contrasena:'',
    correo:'',
    empresa:undefined
  }
  recordarme:boolean=false;
  cargando: boolean = false;
  ngOnInit(): void {
  }
  login(form: NgForm) {
    Swal.fire({
      title: 'Cargando...',
      focusCancel:false,
      allowOutsideClick: false
    });
    Swal.showLoading();
    if (form.invalid) { return  }
    this.auth.login(form.form.value).pipe(finalize(() => {
    })).subscribe((res:any) => {
      if (Object.entries(res).length > 0)
      {
        if (this.recordarme) {localStorage.setItem('user', this.usuario.usuario_nombre); }
        Swal.close();
        localStorage.setItem('token',this.usuario.usuario_nombre);
        localStorage.setItem('empresa',res[0].empresa);
        this.router.navigateByUrl('cards');
      } else {
        Swal.fire({
          title: 'Mensaje',
          icon: 'warning',
          text: 'No se encontro ningun usuario'
        })
      }
    }, err => {
      Swal.fire({ icon: 'warning', text: 'hubo un error en la conexion al servidor' });
    });

  }

}
