import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
})
export class AssetComponent implements OnInit {

  AssetFormGroup: FormGroup;
  AssetClasses = [{ display: "Critical", value: "10" }, { display: "High Impact", value: "20" }, { display: "Medium", value: "30" }, { display: "Info", value: "40" }];
  Options: string[] = ['Working', 'Not Working', 'Others'];
  Devices = [1, 2, 3, 4, 5, 6, 7, 8,1, 2, 3, 4, 5, 6, 7, 8];

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
    this.InitializeFormGroup();
  }

  InitializeFormGroup() {
    this.AssetFormGroup = this._fb.group({
      Space: ['', Validators.required],
      Gateway: [''],
      Title: ['', Validators.required],
      Class: ['', Validators.required],
      Status: ['', Validators.required]
    });
  }

  BackClicked() {
    this._router.navigate(['masters']);
  }

  DeviceClicked() {
    this._router.navigate(['masters/asset-edge']);
  }

  opendialog() {
    const dialogRef = this.dialog.open(DialogComponent
    );
  }

}
