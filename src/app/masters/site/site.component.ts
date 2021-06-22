import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VsenseapiService } from 'src/app/services/vsenseapi.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MSite } from 'src/app/Models/site';
import { ToastColors } from 'src/app/services/toast-colors';
import { Router } from '@angular/router';
@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit {

  SelectedSite: MSite = new MSite();
  SiteFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: VsenseapiService,
    private toast: ToastService,
    private loader: LoaderService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.InitializeFormGroup();
  }
  ionViewWillEnter(){
    if(localStorage.getItem('selected')!="undefined"){
      this.SelectedSite=JSON.parse(localStorage.getItem('selected'));
    }
    this.LoadSelectedSite(this.SelectedSite);
  }
  InitializeFormGroup() {
    this.SiteFormGroup = this.fb.group({
      Title: ['', Validators.required],
      Geo: ['', Validators.required],
      Plant: ['', Validators.required]
    });
  }
  LoadSelectedSite(mSite: MSite) {
    this.SiteFormGroup.get('Title').setValue(mSite.Title);
    this.SiteFormGroup.get('Geo').setValue(mSite.Geo);
    this.SiteFormGroup.get('Plant').setValue(mSite.Plant);
  }
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
  ResetControl(): void {
    this.SelectedSite = new MSite();
    this.SiteFormGroup.reset();
    Object.keys(this.SiteFormGroup.controls).forEach(key => {
      this.SiteFormGroup.get(key).markAsUntouched();
    });
  }
  SaveSiteClicked() {
    if (this.SiteFormGroup.valid) {
      this.loader.showLoader();
      this.GetSiteValues();
      this.service.SaveMSite(this.SelectedSite).subscribe(res => {
        this.loader.hideLoader();
        if(this.SelectedSite.SiteID){
          this.toast.showToast("Site saved successfully", ToastColors.success);
        }
        else{
          this.toast.showToast("Site created successfully", ToastColors.success);
          this.ResetControl();
        }
      },
        err => {
          console.log(err);
          this.loader.hideLoader();
        }
      );
    }
    else {
      this.ShowValidationErrors(this.SiteFormGroup);
    }
  }
  GetSiteValues() {
    this.SelectedSite.Title = this.SiteFormGroup.get('Title').value;
    this.SelectedSite.Geo = this.SiteFormGroup.get('Geo').value;
    this.SelectedSite.Plant = this.SiteFormGroup.get('Plant').value;
  }
  DeleteSiteClicked() {
    this.loader.showLoader();
    this.service.DeleteMSite(this.SelectedSite.SiteID).subscribe(res => {
      this.loader.hideLoader();
      this.toast.showToast("Site deleted successfully", ToastColors.success);
      this.ResetControl();
      this.BackClicked();
      },
      err => {
        console.log(err);
        this.loader.hideLoader();
      }
    );
  }
  BackClicked(){
    this.router.navigate(['/masters']);
  }
}
