import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup = new FormGroup({});;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital = new Hospital('');
  public medicoSeleccionado: Medico | undefined;

  constructor(private fb: FormBuilder,
              private hospitalService:HospitalService,
              private medicoService:MedicoService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ( { id } ) => { this.cargarMedico(id);  } )

    this.medicoService.obtenerMedicoById

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges.subscribe( hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find( hospital => hospital._id === hospitalId )!;
    } )
  }

  guardarMedico(){

    if ( this.medicoForm.invalid ) { return; }

    const { nombre } = this.medicoForm.value;
    if ( this.medicoSeleccionado ) {

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(data).subscribe( (resp:any) => {
        Swal.fire('Actualizado',  `El médico : ${ nombre } ha sido actualizado correctamente`, 'success');
      });
    } else {

      this.medicoService.crearMedico(this.medicoForm.value).subscribe( (resp:any) => {
        this.router.navigateByUrl(`/dashboard/medico/${resp.MedicoDB._id}`);
        Swal.fire('Creado',  `El médico : ${nombre} ha sido creado correctamente`, 'success');
      } )
    }

  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales().subscribe( (hospitales:Hospital[]) => {
      this.hospitales = hospitales;
    })
  }

  cargarMedico(id:string){

    if ( id === 'nuevo' ) { return; }

    this.medicoService.obtenerMedicoById(id).subscribe( (medico:Medico) => {

      if (!medico){
        this.router.navigateByUrl(`/dashboard/medicos`);
      }
      this.medicoSeleccionado = medico;
      this.medicoForm.patchValue({
        nombre: medico.nombre,
        hospital: medico.hospital?._id ?? ''
      })
    });
  }
}


