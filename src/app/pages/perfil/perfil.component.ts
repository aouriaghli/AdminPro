import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})

export class PerfilComponent implements OnInit {

  public perfilForm : FormGroup = new FormGroup({});
  public usuario: Usuario | undefined;
  public imagenSubir: File | undefined;
  public imgTemp: string = '';

  constructor(private fb: FormBuilder,
              private usuarioService:UsuarioService,
              private fileuploadService:FileUploadService) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe( () => {
      const {nombre, email} = this.perfilForm.value;
      this.usuario!.nombre = nombre;
      this.usuario!.email = email;

      Swal.fire('Guardado', 'Cambios guardados', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  cambiarImagen(target:any){
    this.imagenSubir = target.files[0];
    if(!target.files[0]){
      this.imgTemp = '';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(target.files[0]);

    reader.onloadend = () => {
      //console.log(reader.result);
      this.imgTemp = reader.result as string;
    }
  }

  subirImagen(){
    this.fileuploadService.actualizarFoto(this.imagenSubir!, 'usuarios', this.usuario!.uid!)
      .then( img => {
        Swal.fire('Guardado', 'Imagen guardada con éxito', 'success');
        this.usuario!.img = img;
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
