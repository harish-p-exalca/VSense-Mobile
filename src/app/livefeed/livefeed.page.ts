import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { VsenseapiService } from '../services/vsenseapi.service';

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.page.html',
  styleUrls: ['./livefeed.page.scss'],
})
export class LivefeedPage implements OnInit {

  IsSearch:boolean=false;
  LiveFeeds:any[]=[];
  LiveFeedDisplayedColumns: string[] = [
    'LogID',
    'Site',
		'Space',
		'Asset',
		'EdgeID',
		'RefID',
		'DateTime',
		'PramTitle',
		'Value',
		'MinValue',
		'MaxValue',
		'AvgValue',
		'Threshold',
  ];
  LiveFeedDataSource:MatTableDataSource<any>;
  SearchKey:any;

  constructor(
    private _router:Router,
    private loader:LoaderService,
    private service:VsenseapiService
    ) { }

  ngOnInit() {
    // this.GetLivFeeds();
  }
  ionViewWillEnter(){
    this.GetLivFeeds();
  }

  GetLivFeeds(){
    this.loader.showLoader();
    this.service.GetLivFeeds().subscribe(res=>{
      this.LiveFeeds=res;
      this.LiveFeedDataSource=new MatTableDataSource(this.LiveFeeds);
      this.loader.hideLoader();
    },
    err=>{
      this.loader.hideLoader();
      console.log(err);
    });
  }

  applyFilter() {
    this.LiveFeedDataSource.filter = this.SearchKey.trim().toLowerCase();
  }

  back(){
    this._router.navigate(['dashboard']);
  }

  ToggleSearch(){
    this.IsSearch=!this.IsSearch;
  }
}
