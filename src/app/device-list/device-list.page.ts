import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {
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
  constructor() { }
  ngOnInit() {
  }

}
