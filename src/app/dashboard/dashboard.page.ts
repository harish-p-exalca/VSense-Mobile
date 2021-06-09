import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexTooltip, ApexDataLabels, ApexFill, ApexGrid, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  grid:ApexGrid;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild("splinechart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private _router:Router
  ) { 
    this.chartOptions = {
      series: [
        {
          name: "Active devices",
          data: [110, 40, 28, 100, 42, 109, 100]
        }
      ],
      chart: {
        type: "area",
        height: "146px",
        width: "100%",
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        colors: ["#7d95ff"],
        width: 2
      },
      fill: {
        colors: ["#7d95ff"],
        type: "gradient",
        gradient: {
          shadeIntensity: 0,
          opacityFrom: 0.6,
          opacityTo: 0.4,
          stops: [0, 50, 100]
        }
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },
      grid:{
        show:false
      }
    };
  }

  ngOnInit() {
  }

  MastersClicked(){
    this._router.navigate(['masters']);
  }
  LiveFeedsClicked(){
    this._router.navigate(['livefeed']);
  }
  ExceptionsClicked(){
    this._router.navigate(['exceptions']);
  }
  DeviceListClicked(){
    this._router.navigate(['device-list']);
  }
}
