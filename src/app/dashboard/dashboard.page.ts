import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexTooltip, ApexDataLabels, ApexFill, ApexGrid, ChartComponent, ApexMarkers } from 'ng-apexcharts';
import { MonitorTableView } from '../models/monitor';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { VsenseapiService } from '../services/vsenseapi.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  grid:ApexGrid;
  markers:ApexMarkers;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild("splinechart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  AllDevices:MonitorTableView[]=[];
  AllDevicesCount:number=0;
  ActiveDevicesCount:number=0;
  InactiveDevicesCount:number=0;

  constructor(
    private _router:Router,
    private loader:LoaderService,
    private toast:ToastService,
    private service:VsenseapiService
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
      markers:{
        size:[5],
        colors:["#7d95ff"],
        hover: {
          size: undefined,
          sizeOffset: 3
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
    this.GetMonitorData();
  }

  GetMonitorData() {
    this.loader.showLoader();
    this.service.GetMonitorTable().subscribe((data: any[]) => {
      this.AllDevices=<MonitorTableView[]>data;
      this.AllDevicesCount=this.AllDevices.length;
      this.ActiveDevicesCount = this.AllDevices.filter(x=>x.Status==true).length;
      this.InactiveDevicesCount=this.AllDevices.filter(x=>x.Status==false).length;
      this.service.GetEdgeStatusChartData().subscribe(data => {
        // console.log(data);
        const deviceStatus = data;
        this.chartOptions.series=[{
          name:"Active devices",
          data:deviceStatus
        }];
        this.loader.hideLoader();
      },
      err=>{
        this.loader.hideLoader();
        console.log(err);
      });
      this.loader.hideLoader();
    },
      err => {
        console.log(err)
        this.loader.hideLoader();
      });
  }

  MastersClicked(index:number){
    this._router.navigate(['masters'],{
      queryParams: { id: index },
    });
  }
  LiveFeedsClicked(){
    this._router.navigate(['livefeed']);
  }
  ExceptionsClicked(){
    this._router.navigate(['exceptions']);
  }
  DeviceListClicked(){
    this._router.navigate(['dashboard/device-list']);
  }
}
