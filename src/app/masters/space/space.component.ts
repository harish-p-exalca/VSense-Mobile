import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';
import { VsenseapiService } from 'src/app/services/vsenseapi.service';
import { MSpace, MSite } from 'src/app/Models/site';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastColors } from 'src/app/services/toast-colors';
@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
})
export class SpaceComponent implements OnInit {
    
  SelectedSpace:MSpace=new MSpace();
  SpaceFormGroup:FormGroup;
  MSites:MSite[]=[];
  SearchKey:any;

  constructor(
    private fb:FormBuilder,
    private service:VsenseapiService,
    private toast: ToastService,
    private loader: LoaderService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.InitializeFormGroup();
    this.GetAllMSites();
  }
  ionViewWillEnter(){
    if(localStorage.getItem('selected')!="undefined"){
      this.SelectedSpace=JSON.parse(localStorage.getItem('selected'));
    }
    this.LoadSelectedSpace(this.SelectedSpace);
  }
  InitializeFormGroup(){
    this.SpaceFormGroup=this.fb.group({
      Title:['',Validators.required],
      WorkCenter:['',Validators.required],
      ParantSpace:[null],
      Site:[null,Validators.required]
    });
  }
  GetAllMSites(){
    this.service.GetMSites().subscribe(res=>{
      this.MSites=<MSite[]>res;
    },
    err=>{
      console.log(err);
    });
  }
  LoadSelectedSpace(mSpace:MSpace){
    this.SpaceFormGroup.get('Title').setValue(mSpace.Title);
    this.SpaceFormGroup.get('WorkCenter').setValue(mSpace.WorkCenter);
    this.SpaceFormGroup.get('ParantSpace').setValue(mSpace.ParantSpaceID);
    this.SpaceFormGroup.get('Site').setValue(mSpace.SiteID);
  }
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
  ResetControl(): void {
    this.SelectedSpace = new MSpace();
    this.SpaceFormGroup.reset();
    Object.keys(this.SpaceFormGroup.controls).forEach(key => {
      this.SpaceFormGroup.get(key).markAsUntouched();
    });
  }
  SaveSpaceClicked() {
    if (this.SpaceFormGroup.valid) {
      this.loader.showLoader();
      this.GetSpaceValues();
      this.service.SaveMSpace(this.SelectedSpace).subscribe(res => {
        this.loader.hideLoader();
        if(this.SelectedSpace.SpaceID){
          this.toast.showToast("Space saved successfully", ToastColors.success);
        }
        else{
          this.toast.showToast("Space created successfully", ToastColors.success);
          this.ResetControl();
        }
        this.ResetControl();
      },
        err => {
          console.log(err);
          this.loader.hideLoader();
        });
    }
    else {
      this.ShowValidationErrors(this.SpaceFormGroup);
    }
  }
  GetSpaceValues() {
    this.SelectedSpace.Title = this.SpaceFormGroup.get('Title').value;
    this.SelectedSpace.WorkCenter = this.SpaceFormGroup.get('WorkCenter').value;
    this.SelectedSpace.ParantSpaceID = this.SpaceFormGroup.get('ParantSpace').value;
    this.SelectedSpace.SiteID = this.SpaceFormGroup.get('Site').value;
  }
  DeleteSpaceClicked() {
    this.loader.showLoader();
    this.service.DeleteMSpace(this.SelectedSpace.SpaceID).subscribe(res => {
      this.loader.hideLoader();
      this.toast.showToast("Space deleted successfully", ToastColors.success);
      this.ResetControl();
      this.BackClicked();
    },
      err => {
        console.log(err);
        this.loader.hideLoader();
      });
  }
  BackClicked(){
    this.router.navigate(['/masters']);
  }
}
