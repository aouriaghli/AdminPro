import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  cargarMedicos(){
    return this.http.get(`${base_url}/medicos`, this.headers)
    .pipe(
      map( (resp:any)  => resp.medicos )
    )
  }

  obtenerMedicoById(id:string){
    return this.http.get(`${base_url}/medicos/${id}`, this.headers)
    .pipe(
      map( (resp:any)  => resp.medico )
    )
  }



  crearMedico(medico: {nombre:string, hospital:string, img?:string}){
    return this.http.post(`${base_url}/medicos`, medico, this.headers);
  }

  actualizarMedico(medico:Medico){
    return this.http.put(`${base_url}/medicos/${medico._id}`, medico, this.headers);
  }

  borrarMedico(medico:Medico){
    return this.http.delete(`${base_url}/medicos/${medico._id}`, this.headers);
  }

}
