import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent {


   // Doughnut
  @Input() public title: string = 'Sin título';
  @Input('labels') public doughnutChartLabels: string[] =  ['labels1','labels2','labels3'];

  @Input('data') public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] ,
        backgroundColor: ['#6857E6', '#009FEE', '#F02059']},
    ],
  };

  public doughnutChartType: ChartType = 'doughnut';



  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
