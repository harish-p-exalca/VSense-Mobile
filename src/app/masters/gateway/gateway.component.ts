import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MEdge, MEdgeGroupParam, MEdgeGroupView } from 'src/app/Models/site';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastColors } from 'src/app/services/toast-colors';
import { ToastService } from 'src/app/services/toast.service';
import { VsenseapiService } from 'src/app/services/vsenseapi.service';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss'],
})
export class GatewayComponent implements OnInit {

  SelectedGateway: MEdge = new MEdge();
  GatewayFormGroup: FormGroup;
  MEdgeGroups: MEdgeGroupView[] = [];
  ParamDataSource: MatTableDataSource<MEdgeGroupParam> = new MatTableDataSource([]);
  ParamdisplayedColumns: string[] = ["ParamID", "Title", "Unit", "LongText", "Min", "Max"];

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private service: VsenseapiService,
    private loader: LoaderService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.GetAllEdgeGroups();
    this.InitializeFormGroup();
  }
  ionViewWillEnter(){
    if(localStorage.getItem('selected')!="undefined"){
      this.SelectedGateway=JSON.parse(localStorage.getItem('selected'));
    }
    this.LoadSelectedGateway(this.SelectedGateway);
  }
  InitializeFormGroup() {
    this.GatewayFormGroup = this._fb.group({
      Title: ['', Validators.required],
      PutToUse: ['', Validators.required],
      SoftwareVersion: ['', Validators.required],
      Vcc: [null, Validators.required],
      EdgeGroup: [null],
      LifeSpan: [null, Validators.required]
    });
  }
  GetAllEdgeGroups() {
    this.loader.showLoader();
    this.service.GetMEdgeGroups().subscribe(res => {
      this.MEdgeGroups = <MEdgeGroupView[]>res;
      this.loader.hideLoader();
    },
      err => {
        console.log(err);
        this.loader.hideLoader();
      });
  }
  LoadSelectedGateway(gateway: MEdge) {
    this.GatewayFormGroup.get('Title').setValue(gateway.Title);
    this.GatewayFormGroup.get('PutToUse').setValue(gateway.PuttoUse);
    this.GatewayFormGroup.get('SoftwareVersion').setValue(gateway.SoftwareVersion);
    this.GatewayFormGroup.get('Vcc').setValue(gateway.Vcc);
    this.GatewayFormGroup.get('EdgeGroup').setValue(gateway.EdgeGroup);
    this.GatewayFormGroup.get('LifeSpan').setValue(gateway.Lifespan);
  }
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
  ResetControl(): void {
    this.SelectedGateway = new MEdge();
    this.GatewayFormGroup.reset();
    Object.keys(this.GatewayFormGroup.controls).forEach(key => {
      this.GatewayFormGroup.get(key).markAsUntouched();
    });
    this.ParamDataSource = new MatTableDataSource([]);
  }
  SaveGatewayClicked() {
    if (this.GatewayFormGroup.valid) {
      this.loader.showLoader();
      this.GetEdgeValues();
      this.service.SaveMEdge(this.SelectedGateway).subscribe(res => {
        this.loader.hideLoader();
        if(this.SelectedGateway.EdgeID){
          this.toast.showToast("Gateway saved successfully", ToastColors.success);
        }
        else{
          this.toast.showToast("Gateway created successfully", ToastColors.success);
          this.ResetControl();
        }
      },
        err => {
          console.log(err);
          this.loader.hideLoader();
        });
    }
    else {
      this.ShowValidationErrors(this.GatewayFormGroup);
    }
  }
  GetEdgeValues() {
    this.SelectedGateway.Title = this.GatewayFormGroup.get('Title').value;
    this.SelectedGateway.PuttoUse = this.GatewayFormGroup.get('PutToUse').value;
    this.SelectedGateway.SoftwareVersion = this.GatewayFormGroup.get('SoftwareVersion').value;
    this.SelectedGateway.Vcc = this.GatewayFormGroup.get('Vcc').value;
    this.SelectedGateway.EdgeGroup = this.GatewayFormGroup.get('EdgeGroup').value;
    this.SelectedGateway.Status = this.GatewayFormGroup.get('Status').value;
    this.SelectedGateway.ParantEdgeID = this.GatewayFormGroup.get('ParantEdgeID').value;
    this.SelectedGateway.Lifespan = this.GatewayFormGroup.get('LifeSpan').value;
  }
  DeleteGatewayClicked() {
    this.loader.showLoader();
    this.service.DeleteMEdge(this.SelectedGateway.EdgeID).subscribe(res => {
      this.loader.hideLoader();
      this.toast.showToast("Gateway deleted successfully", ToastColors.success);
      this.ResetControl();
      this.BackClicked();
    },
      err => {
        console.log(err);
        this.loader.hideLoader();
      });
  }
  SetParamTable(params: MEdgeGroupParam[]) {
    this.ParamDataSource = new MatTableDataSource(params);
  }

  BackClicked() {
    this._router.navigate(['masters']);
  }

}
