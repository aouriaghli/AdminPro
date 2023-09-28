import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  //menuItems: any[];
  public usuario: Usuario;

  constructor(public sideBarService:SidebarService, private usuarioService:UsuarioService){
    //this.menuItems = this.sideBarService.menu;
    this.usuario = this.usuarioService.usuario!;
  }
}
