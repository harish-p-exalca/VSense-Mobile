import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface List {
  ExcepID: string;
  Space:string;
  Site:string;
  Class: string;
  Asset:string;
  Value:string;
  Status:string;
  PramID:string;
  DateTime:string;
  Assignedto:string;
  Threshold:string;
  SLAStart:string;
  Resolve:string;
}
const LIST_DATA: List[] = [
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},

];
@Component({
  selector: 'app-exceptions',
  templateUrl: './exceptions.page.html',
  styleUrls: ['./exceptions.page.scss'],
})
export class ExceptionsPage implements OnInit {
  a:any=1;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns:string[]=["Excep I’D","Site","Space","Asset","Class","PramID","Value","Date/Time",
  "Assigned To","Threshold","SLA Start","Status","Resolve"];
  dataSource:MatTableDataSource<any>=new MatTableDataSource(LIST_DATA);
  hide = true;

  constructor() { }

  ngOnInit() {
  }
  search(){
    this.a=2;
  }
  close(){
    this.a=1;
  }
}
