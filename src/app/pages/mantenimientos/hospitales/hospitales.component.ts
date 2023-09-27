import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription = new Subscription();
  public hospitalesTmp: Hospital[] = [];

  constructor(private hospitalService:HospitalService,
             private modalImagenService:ModalImagenService,
             private busquedaService:BusquedasService){}


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe( img => this.cargarHospitales() );
  }

  cargarHospitales(){

    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe( hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
      this.hospitalesTmp = hospitales;
    } );
  }

  guardarCambios(hospital:Hospital){
    this.hospitalService.actualizarHospital(hospital).subscribe(
      resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
        this.cargarHospitales();
      }
    );
  }

  eliminarHospital(hospital:Hospital){
    this.hospitalService.borrarHospital(hospital).subscribe(
      resp => {
        Swal.fire('Borrado', hospital.nombre, 'success');
        this.cargarHospitales();
      }
    );
  }

  async abrirSweetAlert(){
    const valor = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'nombre del hospital',
    })

    if( !valor || valor.value === ''){
      return;
    }else if (valor!.value!.length > 0) {
      console.log(valor);
      this.hospitalService.crearHospital(valor.value!).subscribe(
        (resp:any) => {
          Swal.fire('Creado', valor.value!, 'success');
          //this.hospitales.push(resp.Hospital);
          this.cargarHospitales();
        }
      );
    }
  }

  abrirModal(hospital:Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital._id!, hospital.img!);
  }

  buscar(termino:string){

    if(termino.length === 0){
      this.hospitales = this.hospitalesTmp;
      return;
    }
    this.busquedaService.buscar('hospitales', termino).subscribe( (resp:Hospital[]) => {
      this.hospitales = resp;
    } );
  }
}
