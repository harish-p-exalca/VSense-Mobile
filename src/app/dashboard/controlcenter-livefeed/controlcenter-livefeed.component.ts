import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ControlCenterFeed } from 'src/app/models/control-center';

@Component({
  selector: 'app-controlcenter-livefeed',
  templateUrl: './controlcenter-livefeed.component.html',
  styleUrls: ['./controlcenter-livefeed.component.scss'],
})
export class ControlcenterLivefeedComponent implements OnInit {
  
  IsSearch:boolean=false;
  ControlCenterFeeds:ControlCenterFeed[]=[];
  FeedDisplayedColumns: string[] = ['Site', 'Space', 'Title', 'Asset', 'Value', 'Lastfeed', 'Status'];
  FeedDataSource:MatTableDataSource<ControlCenterFeed>;
  SearchKey: any;

  constructor(
    private _router:Router
  ) { }

  ngOnInit() {
    this.ControlCenterFeeds=JSON.parse(localStorage.getItem('feeds'));
    this.FeedDataSource=new MatTableDataSource(this.ControlCenterFeeds);
  }
  ionViewWillLeave(){
    localStorage.removeItem('feeds');
  }
  
  back(){
    this._router.navigate(['dashboard/control-center']);
  }
  ToggleSearch(){
    this.IsSearch=!this.IsSearch;
  }
  applyFilter() {
    this.FeedDataSource.filter = this.SearchKey.trim().toLowerCase();
  }
}
