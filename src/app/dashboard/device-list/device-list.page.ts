import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MonitorTableView } from 'src/app/models/monitor';
import { LoaderService } from 'src/app/services/loader.service';
import { VsenseapiService } from 'src/app/services/vsenseapi.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss']

})
export class DeviceListPage implements OnInit {

  IsSearch: boolean = false;
  selectedIndex: number = 0;
  AllDevices: any[] = [];
  ActiveDevices: any[] = [];
  InactiveDevices: any[] = [];
  DeviceDataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  DevicedisplayedColumns: string[] = ['Site', 'Space', 'Asset', 'Edge', 'LastFeed', 'Status', 'Action'];
  SearchKey: string;

  constructor(
    private _router: Router,
    private loader: LoaderService,
    private service: VsenseapiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.GetMonitorData();
    localStorage.removeItem('assignment');
  }

  GetMonitorData() {
    this.loader.showLoader();
    this.service.GetMonitorTable().subscribe((data: any[]) => {
      this.AllDevices = <MonitorTableView[]>data;
      this.ActiveDevices = this.AllDevices.filter(x => x.Status == true);
      this.InactiveDevices = this.AllDevices.filter(x => x.Status == false);
      if (this.selectedIndex == 1) {
        this.LoadTableSource(this.ActiveDevices);
      }
      else if (this.selectedIndex == 2) {
        this.LoadTableSource(this.InactiveDevices);
      }
      else {
        this.LoadTableSource(this.AllDevices);
      }
      this.loader.hideLoader();
    },
      err => {
        console.log(err)
        this.loader.hideLoader();
      });
  }

  ViewDetails(Data) {
    localStorage.setItem('assignment', JSON.stringify(Data));
    this.router.navigate(['dashboard/control-center']);
  }

  ChangeDevice() {
    if (this.selectedIndex==1) {
      this.LoadTableSource(this.ActiveDevices);
    }
    else if (this.selectedIndex==2) {
      this.LoadTableSource(this.InactiveDevices);
    }
    else {
      this.LoadTableSource(this.AllDevices);
    }
  }

  LoadTableSource(DataArray: any[]) {
    this.DeviceDataSource = new MatTableDataSource(DataArray);
  }

  applyFilter() {
    this.DeviceDataSource.filter = this.SearchKey.trim().toLowerCase();
  }

  ToggleDeviceStatus(EdgeID: number) {
    this.service.ToggleDeviceStatus(EdgeID).subscribe(res => {
      this.GetMonitorData();
    },
      err => {
        console.log(err);
      });
  }

  back() {
    this._router.navigate(['dashboard']);
  }

  ToggleSearch() {
    this.IsSearch = !this.IsSearch;
  }

}
