import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit{

  public hospitales:Hospital[] = [];
  public medicos:Medico[] = [];
  public usuarios:Usuario[] = [];

  constructor(private activatedRoute:ActivatedRoute,
              private busquedasService:BusquedasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({termino}) => {
      this.busquedaGlobal(termino);
    } )
  }

  busquedaGlobal(termino:string){
    this.busquedasService.busquedaGlobal(termino)
    .subscribe( (resp:any) => {
      this.usuarios = resp.usuarios;
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
    })
  }

  //Esto al final esta hecho con un routerlink en el html
  abrirMedico(medico:Medico){
  }

}
