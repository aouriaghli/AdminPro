import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Hospital } from '../models/hospital.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { HospitalesComponent } from '../pages/mantenimientos/hospitales/hospitales.component';

const base_url = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public hospital:Hospital | undefined;

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

  cargarHospitales(){
    return this.http.get(`${base_url}/hospitales`, this.headers)
    .pipe(
      map( (resp:any)  => resp.hospitales )
    )
  }

  crearHospital(nombre:string){
    return this.http.post(`${base_url}/hospitales`, {nombre}, this.headers);
  }

  actualizarHospital(hospital:Hospital){
    return this.http.put(`${base_url}/hospitales/${hospital._id}`, hospital, this.headers);
  }

  borrarHospital(hospital:Hospital){
    return this.http.delete(`${base_url}/hospitales/${hospital._id}`, this.headers);
  }

}
