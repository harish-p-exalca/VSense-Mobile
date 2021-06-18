import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
export interface List {
  // photos: string;
  // LogID: string;
  Site: string;
  Space: string;
  Title:string;
  Asset: string;
  Value: string;
  Lastfeed: string;
  Status: string;
}
const LIST_DATA: List[] = [
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 { Site:'12345',Space:'Space',Title:'Title',Asset: 'Asset',Value:'Value',Lastfeed:'Lastfeed',Status: 'Status'},
 
 
];

@Component({
  selector: 'app-controlcenter-livefeed',
  templateUrl: './controlcenter-livefeed.component.html',
  styleUrls: ['./controlcenter-livefeed.component.scss'],
})
export class ControlcenterLivefeedComponent implements OnInit {
  a:any=1;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
  
    'Site',
		'Space',
    'Title',
		'Asset',
		'Value',
	'Lastfeed',
  'Status'
    
  ];
  // dataSource = LIST_DATA;
  data = Object.assign(LIST_DATA);
dataSource = new MatTableDataSource<List>(this.data);
  constructor(private _router:Router) { }

  ngOnInit() {}
  search(){
    this.a=2;
  }
  close(){
    this.a=1;
  }
  back(){
    this._router.navigate(['dashboard/control-center']);
  }
}
