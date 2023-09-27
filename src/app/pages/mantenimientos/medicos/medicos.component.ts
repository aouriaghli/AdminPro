import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  cargando: boolean = true;
  medicos: Medico[] = [];
  medicosTmp: Medico[] = [];
  hospitales: Hospital[] = [];
  public imgSubs: Subscription = new Subscription();

  constructor(private medicoService:MedicoService,
             private hospitalService:HospitalService,
             private modalImagenService:ModalImagenService,
             private busquedaService:BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe( img => this.cargarMedicos() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos(){

    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe( medicos => {
      this.cargando = false;
      this.medicos = medicos;
      this.medicosTmp = medicos;
    } );
  }

  guardarCambios(medico:Medico){
    this.medicoService.actualizarMedico(medico).subscribe(
      resp => {
        Swal.fire('Actualizado', medico.nombre, 'success');
        this.cargarMedicos();
      }
    );
  }

  eliminarMedico(medico:Medico){
    Swal.fire({
      title: '¿Borrar Médico?',
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicoService.borrarMedico(medico!).subscribe( resp => {
          Swal.fire(
            'Borrado!',
            `El médico ${ medico.nombre } ha sido borrado con éxito.`,
            'success'
          );
          this.cargarMedicos();
        } );

      }
    })
  }

  cargarHospitales(){

    this.hospitalService.cargarHospitales().subscribe( hospitales => {
      this.hospitales = hospitales;
    } );
  }

  cambiarHospital(medico:Medico){
    console.log(medico.hospital?._id);
  }

  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img!);
  }

  buscar(termino:string){

    if(termino.length === 0){
      this.medicos = this.medicosTmp;
      return;
    }
    this.busquedaService.buscar('medicos', termino).subscribe( (resp:Medico[]) => {
      this.medicos = resp;
    } );
  }

}
