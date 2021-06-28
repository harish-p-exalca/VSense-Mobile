import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { VsenseapiService } from '../services/vsenseapi.service';

@Component({
  selector: 'app-exceptions',
  templateUrl: './exceptions.page.html',
  styleUrls: ['./exceptions.page.scss'],
})
export class ExceptionsPage implements OnInit {

  IsSearch: boolean = false;
  ExceptionDisplayedColumns: string[] = ["ExcepID", "Site", "Space", "Asset", "Class", "PramID", "Value", "DateTime",
    "AssignedTo", "Threshold", "SLAStart", "Status", "Resolve"];
  ExceptionDataSource: MatTableDataSource<any>;
  Exceptions: any[] = [];
  SearchKey: any;

  constructor(
    private _router: Router,
    private loader: LoaderService,
    private service: VsenseapiService
  ) { }

  ngOnInit(): void {
    // this.GetExceptions();
  }

  ionViewWillEnter(){
    this.GetExceptions();
  }

  GetExceptions() {
    this.loader.showLoader();
    this.service.GetExceptions().subscribe(res => {
      this.Exceptions = res;
      this.ExceptionDataSource = new MatTableDataSource(this.Exceptions);
      this.loader.hideLoader();
    },
      err => {
        this.loader.hideLoader();
        console.log(err);
      });
  }

  applyFilter() {
    this.ExceptionDataSource.filter = this.SearchKey.trim().toLowerCase();
  }

  back() {
    this._router.navigate(['dashboard']);
  }

  ToggleSearch() {
    this.IsSearch = !this.IsSearch;
  }
}
