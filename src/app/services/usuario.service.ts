import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private router:Router) { }


  logout(){
    localStorage.removeItem('token');

    google.accounts.id.revoke('ayb.job@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }

  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${baseUrl}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      } ),
      map( resp => true ),
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
