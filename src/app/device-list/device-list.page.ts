import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface List {
  // photos: string;
  LogID: string;
  Site: string;
  Space: string;
  Asset: string;
 
}
const LIST_DATA: List[] = [
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',},
 
];
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {
  displayedColumns: string[] = [
    'LogID',
    'Site',
		'Space',
		'Asset',
  ];
  // dataSource = LIST_DATA;
  data = Object.assign(LIST_DATA);
dataSource = new MatTableDataSource<List>(this.data);
  constructor() { }

  ngOnInit() {
  }

}
