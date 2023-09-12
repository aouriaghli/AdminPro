import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, AfterViewInit{

  public formSubmitted = false;

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm: FormGroup = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(private router:Router,
             private fb: FormBuilder,
             private usuarioSrvice: UsuarioService){  }


  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '1091745050643-bo2fhrdrreat75frr0jv9vch22599sf6.apps.googleusercontent.com',
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response:any) {
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioSrvice.logingGoogle(response.credential).subscribe(
        resp => {
          //console.log( {login : resp})
          this.router.navigateByUrl('/');
        });
  }

  login(){

    this.usuarioSrvice.login(this.loginForm.value)
      .subscribe(
      { next: resp => {
       if (this.loginForm.get('remember')?.value) {
         localStorage.setItem('email', this.loginForm.get('email')?.value);
       }else{
          localStorage.removeItem('email');
       }
       this.router.navigateByUrl('/');
      }, error: (err) =>
      {  Swal.fire('Error', err.error.msg, 'error')}
    });
    this.router.navigateByUrl('/');
    //console.log(this.loginForm.value);
  }
}
