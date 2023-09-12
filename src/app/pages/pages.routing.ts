import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';

const routes:Routes = [
  {
    path: 'dashboard',
   component: PagesComponent,
   canActivate: [AuthGuard],
   children: [
    { path: '', component: DashboardComponent, data: { titulo : 'Dashboard'} },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo : 'Ajustes de la cuenta'} },
    { path: 'grafica1', component: Grafica1Component, data: { titulo : 'Gráfica #1'} },
    { path: 'progress', component: ProgressComponent, data: { titulo : 'ProgressBar'} },
    { path: 'promesas', component: PromesasComponent, data: { titulo : 'Promesas'} },
    { path: 'rxjs', component: RxjsComponent, data: { titulo : 'RxJs'} },
   ]
  },
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild( routes )],
  exports: [ RouterModule]
})
export class PagesRoutingModule { }
