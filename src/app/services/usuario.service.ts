import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';

declare const google: any;

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario:Usuario | undefined;
  constructor(private http:HttpClient, private router:Router) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
      'x-token': this.token
      }
    }
  }

  logout(){
    localStorage.removeItem('token');

    if(this.usuario?.google){
      google.accounts.id.revoke('ayb.job@gmail.com', () => {
        this.router.navigateByUrl('/login');
      })
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  validarToken():Observable<boolean>{
    //const token = localStorage.getItem('token') || '';
    return this.http.get(`${baseUrl}/login/renew`, this.headers
    ).pipe(
      map( (resp: any) => {

        const { email,google,nombre,role,img = '',uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', role, google, img, uid);
        localStorage.setItem('token', resp.token);
        return true

      } ),
      catchError( error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){

      return this.http.post(`${baseUrl}/usuarios`, formData).pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  actualizarPerfil(data: {email:string, nombre:string, role:string}){
    data = {
      ...data,
      role: this.usuario?.role || '',
    }
    return this.http.put(`${baseUrl}/usuarios/${this.usuario?.uid}`, data, this.headers);
  }


  login(formData: LoginForm){

    return this.http.post(`${baseUrl}/login`, formData)
          .pipe(
            tap( (resp: any) => {
              localStorage.setItem('token', resp.token)
            })
          );
  }

  logingGoogle(token: string){
    return this.http.post(`${baseUrl}/login/google`, {token})
        .pipe(
          tap( (resp: any) => {
            localStorage.setItem('token', resp.token)
          })
        );
  }

  cargarUsuarios(desde:number = 0){
    return this.http.get<CargarUsuarios>(`${baseUrl}/usuarios?desde=${desde}`, this.headers)
      .pipe(
        //delay(1500), //como es muy rapido, ponemos esto para que se vea el loading por pantalla
        map( resp => {
          const usuarios = resp.usuarios.map(
            user => new Usuario(user.nombre, user.email, '', user.role, user.google, user.img, user.uid)
          );
          return {
            total: resp.total,
            usuarios
          };
        })
      )
  }

  borrarUsuario(uid:string){
    return this.http.delete(`${baseUrl}/usuarios/${uid}`, this.headers);
  }

  guardarUsuario(usuario:Usuario){
    return this.http.put(`${baseUrl}/usuarios/${usuario?.uid}`, usuario, this.headers);
  }
}
