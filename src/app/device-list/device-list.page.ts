import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface List {
  Site: string;
  Space: string;
  Asset: string;
  Edge:string;
  Lastfeed:string;
  Status:string;
}
const LIST_DATA: List[] = [
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
 { Site:'Site',Space:'Spacelorem',Asset: 'Asset lorem',Edge:'Edge',Lastfeed:'Lastfeed',Status:'Status'},
];
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss']

})
export class DeviceListPage implements OnInit {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'Site',
		'Space',
		'Asset',
    'Edge',
    'Lastfeed',
    'Status',
    'Action'
  ];
  data = Object.assign(LIST_DATA);
dataSource = new MatTableDataSource<List>(this.data);
valu:any=1 ;
value:any;
  valuee: number;
  a:any=1;

  constructor() { }
  ngOnInit() {
  }
all(){
  this.valu=1
  this.value = 2;
  this.valuee=2
}
active(){
  this.valu=2
  this.value = 1;
  this.valuee=2
}
inactive(){
  this.valu=2
  this.value = 2;
  this.valuee=1;
}
search(){
  this.a=2;
}
close(){
  this.a=1;
}
}
