import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[]= [
    { titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu:[
        { titulo: 'Main', url:'/'},
        { titulo: 'ProgressBard', url:'progress'}, //sin poner la barra antes de progress, si pongo la barra tendria que poner tb dashboard /dashboard/progress
        { titulo: 'Gráficas', url:'grafica1'},
      ]
    }
  ];
  constructor() { }
}
