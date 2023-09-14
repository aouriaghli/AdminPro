import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_Url = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http:HttpClient) { }

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

  private transformarUsuarios(resultados:any[]):Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.role, user.google, user.img, user.uid)
    );
  }

  buscar( tipo:'usuarios'|'medicos'|'hospitales', termino:string){
    const url = `${base_Url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
    .pipe(
      map( (resp:any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados);
            break;
          case 'medicos':
            return resp.resultados;
            break;
          case 'hospitales':
            return resp.resultados;
            break;
          default:
            return [];
            break;
        }
      })
    )
  }
}
