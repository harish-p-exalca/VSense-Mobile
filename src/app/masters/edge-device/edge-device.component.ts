import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';
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

 
];
@Component({
  selector: 'app-edge-device',
  templateUrl: './edge-device.component.html',
  styleUrls: ['./edge-device.component.scss'],
  // encapsulation:ViewEncapsulation.None

})
export class EdgeDeviceComponent implements OnInit {
  configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
  };
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
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
  constructor(private fb: FormBuilder,public dialog: MatDialog,public snackBar: MatSnackBar,private _router:Router) {}
  async openSnackBar1(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 500,
      panelClass: ['custom-style1'],
    });
  }
  opendialog(index: number) {
    localStorage.removeItem("NoValue")
    localStorage.removeItem("YesValue")
    
      const dialogRef = this.dialog.open(DialogComponent, {
  
        position: { top: '107%', left: '10%' },
        height: '120px',
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
  back(){
    this._router.navigate(['masters']);
  }
  copyclick(){
    this.openSnackBar1('Copied!', '');
  }
 
}
