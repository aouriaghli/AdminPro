import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {


  ngOnInit(): void {

    this.getUsuarios().then( usuarios => { console.log (usuarios)});



    // const promesa = new Promise( (resolve, reject) => {

    //   if(false){
    //     resolve('Hola Mundo');
    //   }else{
    //     reject('Error en la promesa');
    //   }

    // });

    // promesa.then( ( msg ) => {
    //   console.log( msg);
    // }).catch( error => {
    //     console.log('Error en mi promesa', error);
    // });

    // console.log('Fin del Init');
  }

  getUsuarios(){

    const promesa = new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json())
      .then( body => resolve( body.data));
    });

    return promesa;

  }
}
