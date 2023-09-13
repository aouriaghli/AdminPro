import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  //se puede hacer con http, pero lo vamos a hacer con fetch api

  async actualizarFoto(
    archivo:File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string){
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo); // lo que se envia desde postman

      const resp = await fetch(url, {
        method: 'PUT', // igual que en el backend(postman)
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      if (data.ok){
        return data.nombreArchivo;
      }else{
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
