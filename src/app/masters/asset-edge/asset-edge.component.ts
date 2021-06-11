import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

export interface List {
  ParamID: string;
  Title: string;
  Unit: string;
  Longtext:string;
  Max:string;
  Min:string;
  Icon:string;
  isPercentage:string;
  Color:string;
  Action:string;

}
const LIST_DATA: List[] = [
  { ParamID:'CRNT1',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT2',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT3',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT4',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT5',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT6',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT7',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT8',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT9',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT10',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT11',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT12',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT6',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT7',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT8',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT9',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT10',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT11',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},
  { ParamID:'CRNT12',Title:'Title',Unit: 'Unit',Longtext:'Longtext',Max:'Max',Min:'Min',
  Icon:'Icon',isPercentage:'isPercentage',Color:'Color',Action:''},

 
];
@Component({
  selector: 'app-asset-edge',
  templateUrl: './asset-edge.component.html',
  styleUrls: ['./asset-edge.component.scss'],
})
export class AssetEdgeComponent implements OnInit {
  a:number=1;
  yes_value:any;
  no_value:any;

  index:any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'ParamID',
		'Title',
		'Unit',
    'Longtext',
    'Max',
    'Min',
    'Icon',
    'isPercentage',
    'Color',
    'Action',
  ];
  data = Object.assign(LIST_DATA);
dataSource = new MatTableDataSource<List>(this.data);
  constructor(public dialog: MatDialog,private _router:Router) { }
  opendialog(index: number) {
    localStorage.removeItem("NoValue")
    localStorage.removeItem("YesValue")
    
      const dialogRef = this.dialog.open(DialogComponent, {
        disableClose: true ,
        position: { top: '90%', left: '10%' },
        height: '120px',
        width: '300px',
        hasBackdrop: false,
      });
      dialogRef.backdropClick().subscribe(() => {
        // Close the dialog
        dialogRef.close();
      })
      this.yes_value= localStorage.getItem("YesValue")
      this.no_value= localStorage.getItem("NoValue")
      console.log(this.yes_value);
console.log(this.no_value);
     
         
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
              this.yes_value= localStorage.getItem("YesValue")
              this.no_value= localStorage.getItem("NoValue")
              if(this.yes_value==1){
                this.dataSource.data.splice(index, 1);
                this.dataSource.filter = '';
              }
            
            });
          }
  ngOnInit() {}
  back(){
    this._router.navigate(['masters']);
  }
}
