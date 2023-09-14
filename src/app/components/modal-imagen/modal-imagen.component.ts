import { Component, EventEmitter, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit{

  public imagenSubir: File | undefined;
  public imgTemp: string = '';

  constructor(public modalImagenService:ModalImagenService,
              public fileuploadService:FileUploadService){

  }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = '';
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileuploadService.actualizarFoto(this.imagenSubir!, tipo!, id)
      .then( img => {
        Swal.fire('Guardado', 'Imagen guardada con éxito', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
