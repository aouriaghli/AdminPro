import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

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
    return this.http.get(`${baseUrl}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
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
    return this.http.put(`${baseUrl}/usuarios/${this.usuario?.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
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
}
