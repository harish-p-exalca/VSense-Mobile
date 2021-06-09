import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
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

 
];
@Component({
  selector: 'app-edge-device',
  templateUrl: './edge-device.component.html',
  styleUrls: ['./edge-device.component.scss'],
})
export class EdgeDeviceComponent implements OnInit {
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
  edgedeviceFormGroup: FormGroup;
  constructor(private fb: FormBuilder,public dialog: MatDialog) {}
  opendialog(index: number) {
    localStorage.removeItem("NoValue")
    localStorage.removeItem("YesValue")
    
      const dialogRef = this.dialog.open(DialogComponent, {
  
        position: { top: '100%', left: '10%' },
        height: '15%',
        width: '300px',
        hasBackdrop: false,
      });
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
  ngOnInit() {
    this.edgedeviceFormGroup = this.fb.group({
      Name: [""],
      Purpose: [""],
      Put: [""],
      Lifespan: [""],
    });
    // localStorage.clear();
  
   



    // console.log(this.button_value);
    
    // delete(button_value: number) {
    //   if(this.button_value==1){
    //     this.dataSource.data.splice(button_value, 1);
    //     this.dataSource.filter = '';
    //     console.log(this.a);
        
    //   }
     
    // }
  }
 
}
