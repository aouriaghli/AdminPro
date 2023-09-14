import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

import Swal from 'sweetalert2';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy{

  public imgSubs: Subscription = new Subscription();
  public totalUsuarios:number = 0;
  public usuarios:Usuario[] = [];
  public usuariosTmp:Usuario[] = [];
  public desde:number = 0;
  public cargando:boolean = true;

  constructor(private usuarioService:UsuarioService,
             private busquedaService:BusquedasService,
             private modalImagenService:ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.CargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe( img => this.CargarUsuarios() );
  }


  CargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe( ({ total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTmp = usuarios;
      this.cargando = false;
    } );
  }

  cambiarPagina(valor:number){
    this.desde += valor;

    if(this.desde <0){
      this.desde = 0;
    }else if (this.desde >= this.totalUsuarios){
      this.desde -= valor;
    }
    this.CargarUsuarios();
  }

  buscar(termino:string){

    if(termino.length === 0){
      this.usuarios = this.usuariosTmp;
      return;
    }
    this.busquedaService.buscar('usuarios', termino).subscribe( (resp:any) => {
      this.usuarios = resp;
    } );
  }

  eliminarUsuario(usuario:Usuario){
    if(usuario.uid === this.usuarioService.usuario?.uid){
      Swal.fire('Error', 'No puede borrar su propio usuario', 'error');
      return;
    }

    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.borrarUsuario(usuario!.uid!).subscribe( resp => {
          Swal.fire(
            'Borrado!',
            `El usuario ${ usuario.nombre } ha sido borrado con éxito.`,
            'success'
          );
          this.CargarUsuarios();
        } );

      }
    })
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.guardarUsuario(usuario).subscribe(
      resp => {
        Swal.fire('Actualizado', `El usuario ${ usuario.nombre } ha sido actualizado con éxito.`, 'success');
      }
    );
  }

  abrirModal(usuario:Usuario){
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img!);
  }

}
