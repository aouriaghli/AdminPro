import { state } from '@angular/animations';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService:UsuarioService,
              private router:Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado => {
          if(!estaAutenticado){
             this.router.navigateByUrl('/login');
          }
         })
       );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      console.log('AuthGuard#canActivate called');
      return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado => {
          if(!estaAutenticado){
             this.router.navigateByUrl('/login');
          }
         })
       );
  }

};

