import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any[] = [];


  constructor(private router:Router) { }

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];

    if (this.menu.length === 0){
      //redirect to login
      this.router.navigateByUrl('/login');
    }
  }

  // menu: any[]= [
  //   { titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu:[
  //       { titulo: 'Main', url:'/'},
  //       { titulo: 'Gráficas', url:'grafica1'},
  //       { titulo: 'ProgressBard', url:'progress'}, //sin poner la barra antes de progress, si pongo la barra tendria que poner tb dashboard /dashboard/progress
  //       { titulo: 'Promesas', url:'promesas'},
  //       { titulo: 'Rxjs', url:'rxjs'},
  //     ]
  //   },
  //   { titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu:[
  //       { titulo: 'Usuarios', url:'usuarios'},
  //       { titulo: 'Hospitales', url:'hospitales'},
  //       { titulo: 'Médicos', url:'medicos'},
  //     ]
  //   },
  // ];

}
