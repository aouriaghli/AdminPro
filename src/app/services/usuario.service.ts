import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap } from 'rxjs/operators';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

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
}
