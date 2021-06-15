import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
export interface List {
  // photos: string;
  LogID: string;
  Site: string;
  Space: string;
  Asset: string;
  EdgeID: string;
  RefID: string;
  DateTime: string;
  PramTitle: string;
  Value: string;
  MinValue: string;
  MaxValue: string;
  AvgValue: string;
  Threshold: string;
}
const LIST_DATA: List[] = [
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'}
 
];

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.page.html',
  styleUrls: ['./livefeed.page.scss'],
})
export class LivefeedPage implements OnInit {
  a:any=1;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
  
    'LogID',
    'Site',
		'Space',
		'Asset',
		'EdgeID',
		'RefID',
		'dateTime',
		'PramTitle',
		'value',
		'minValue',
		'maxValue',
		'avgValue',
		'Threshold',
    
  ];
  // dataSource = LIST_DATA;
  data = Object.assign(LIST_DATA);
dataSource = new MatTableDataSource<List>(this.data);
  constructor(private _router:Router) { }

  ngOnInit() {
  }
  search(){
    this.a=2;
  }
  close(){
    this.a=1;
  }
  back(){
    this._router.navigate(['dashboard']);
  }
}
