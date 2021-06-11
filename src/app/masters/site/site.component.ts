import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit {
  configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
  };
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  siteFormGroup: FormGroup;
  constructor(private fb: FormBuilder,private _router:Router,public snackBar: MatSnackBar) {}
  async openSnackBar1(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 500,
      panelClass: ['custom-style1'],
    });
  }
  ngOnInit() {
    this.siteFormGroup = this.fb.group({
      Title: [""],
      Geolocation: [""],
      Plant: [""],
      Date: [""],
    });
  }
back(){
  this._router.navigate(['masters']);
}
deleteclick(){
  this.openSnackBar1('Deleted!', '');
}
updateclick(){
  this.openSnackBar1('Updated!', '');
}
}
