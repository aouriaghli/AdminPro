import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo:string = '';
  public titutloSubs$:Subscription;

  constructor(private router:Router){

    this.titutloSubs$ = this.getArgumentosRuta()
                            .subscribe(
                              ({titulo}) => {
                                this.titulo = titulo,
                                document.title = `AdminPro - ${ titulo }`;

                              });
  }
  ngOnDestroy(): void {
    this.titutloSubs$.unsubscribe();
  }

  getArgumentosRuta(){
    return this.router.events
    .pipe(
      filter( (event:any) => event instanceof ActivationEnd ),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null),
      map( (event:ActivationEnd) => event.snapshot.data)
    );
  }
}
