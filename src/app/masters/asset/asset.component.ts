import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AssetView, MSpace, Assignment, MEdgeAssignParam, MEdge, MEdgeGroupView, MEdgeGroupParam } from 'src/app/Models/site';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastColors } from 'src/app/services/toast-colors';
import { ToastService } from 'src/app/services/toast.service';
import { VsenseapiService } from 'src/app/services/vsenseapi.service';
import { DialogComponent } from '../dialog/dialog.component';
import { AddEdgeDialogComponent } from './add-edge-dialog/add-edge-dialog.component';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
})
export class AssetComponent implements OnInit {

  AssetFormGroup: FormGroup;
  AssetClasses = [{ display: "Critical", value: "10" }, { display: "High Impact", value: "20" }, { display: "Medium", value: "30" }, { display: "Info", value: "40" }];
  Options: string[] = ['Working', 'Not Working', 'Others'];
  AssetViews: AssetView[] = [];
  MSpaces: MSpace[] = [];
  SelectedAsset: AssetView = new AssetView();
  ParamDataSource: MatTableDataSource<MEdgeAssignParam>;
  OpenEdges: MEdge[] = [];
  AllEdges: MEdge[] = [];
  EdgeGroups: MEdgeGroupView[] = [];
  GroupParams: MEdgeGroupParam[] = [];

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private service: VsenseapiService,
    private loader:LoaderService,
    private toast:ToastService
  ) { }

  ngOnInit() {
    this.InitializeFormGroup();
    this.GetAllMSpaces();
    this.GetOpenMEdges();
    this.GetAllEdges();
  }

  ionViewWillEnter(){
    if(localStorage.getItem('selected')!="undefined"){
      this.SelectedAsset=JSON.parse(localStorage.getItem('selected'));
    }
    if(localStorage.getItem('dassignment')){
      var localAssign=JSON.parse(localStorage.getItem('dassignment')) as Assignment;
      var assign=this.SelectedAsset.Assignments.find(x=>x.EdgeID==localAssign?.EdgeID)
      if(assign){
        assign.AssignParams=localAssign.AssignParams;
      }
      else{
        this.SelectedAsset.Assignments.push(localAssign);
      }
    }
    this.LoadSelectedAsset();
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
  GetAllEdges() {
    this.service.GetMEdges().subscribe(res => {
      this.AllEdges = <MEdge[]>res;
      this.loader.hideLoader();
    },
      err => {
        this.loader.hideLoader();
        console.log(err);
      });
  }
  GetAllMSpaces() {
    this.service.GetMSpaces().subscribe(res => {
      this.MSpaces = <MSpace[]>res;
    },
      err => {
        console.log(err);
      });
  }
  GetOpenMEdges() {
    this.service.GetOpenMEdges().subscribe(x => {
      this.OpenEdges = <MEdge[]>x;
    },
      err => {
        console.log(err);
      });
  }
  LoadSelectedAsset() {
    this.AssetFormGroup.get('Space').patchValue(this.SelectedAsset.SpaceID);
    this.AssetFormGroup.get('Title').patchValue(this.SelectedAsset.Title);
    this.AssetFormGroup.get('Class').patchValue(this.SelectedAsset.Class);
    this.AssetFormGroup.get('Status').patchValue(this.SelectedAsset.Status);
  }
  
  DeleteDeviceClicked(index: number) {
    var new_edge = this.AllEdges.find(x => x.EdgeID == this.SelectedAsset.Assignments[index].EdgeID);
    new_edge.Status = "10";
    this.OpenEdges.push(new_edge);
    this.SelectedAsset.Assignments.splice(index, 1);
  }

  OpenDeviceDialog() {
    if (!this.AssetFormGroup.valid) {
      this.ShowValidationErrors(this.AssetFormGroup);
      return;
    }
    if (this.OpenEdges.length == 0) {
      this.toast.showToast("no available devices found", ToastColors.danger);
      return;
    }
    const dialogConfig: MatDialogConfig = {
      data: { OpenEdges: this.OpenEdges },
      panelClass: "device-dialog"
    };
    const dialogRef = this.dialog.open(AddEdgeDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        var assign = new Assignment();
        assign.EdgeID = res.EdgeID;
        assign.Frequency = res.Frequency;
        assign.StartDateTime = res.StartDateTime;
        var space = this.MSpaces.find(x => x.SpaceID == this.AssetFormGroup.get('Space').value);
        assign.SpaceID = space.SpaceID;
        assign.SiteID = space.SiteID;
        assign.AssignParams = [];
        this.SelectedAsset.Assignments.push(assign);
        this.OpenEdges.splice(this.OpenEdges.findIndex(x => x.EdgeID == res.EdgeID), 1);
      }
    });
  }
  GetEdgeName(EdgeID: number): string {
    var edge = this.AllEdges.find(x => x.EdgeID == EdgeID);
    if (edge != undefined) {
      return edge.Title;
    }
    return "";
  }
  
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
  ResetControl(): void {
    this.SelectedAsset = new AssetView();
    this.AssetFormGroup.reset();
    Object.keys(this.AssetFormGroup.controls).forEach(key => {
      this.AssetFormGroup.get(key).markAsUntouched();
    });
  }
  SaveAssetClicked() {
    if (this.AssetFormGroup.valid) {
      this.loader.showLoader();
      this.GetAssetValues();
      this.service.SaveMAsset(this.SelectedAsset).subscribe(res => {
        this.loader.hideLoader();
        if(this.SelectedAsset.AssetID){
          this.toast.showToast("Asset saved successfully", ToastColors.success);
        }
        else{
          this.toast.showToast("Asset created successfully", ToastColors.success);
          this.ResetControl();
        }
      },
        err => {
          console.log(err);
          this.loader.hideLoader();
        });
    }
    else {
      this.ShowValidationErrors(this.AssetFormGroup);
    }
  }
  GetAssetValues() {
    this.SelectedAsset.SpaceID = this.AssetFormGroup.get('Space').value;
    this.SelectedAsset.Title = this.AssetFormGroup.get('Title').value;
    this.SelectedAsset.Class = this.AssetFormGroup.get('Class').value;
    this.SelectedAsset.Status = this.AssetFormGroup.get('Status').value;
  }
  DeleteAssetClicked() {
    this.loader.showLoader();
    this.service.DeleteMAsset(this.SelectedAsset.AssetID).subscribe(res => {
      this.loader.hideLoader();
      this.toast.showToast("Asset deleted successfully", ToastColors.success);
      this.ResetControl();
      this.BackClicked();
    },
      err => {
        console.log(err);
        this.loader.hideLoader();
      });
  }
  

  BackClicked() {
    this._router.navigate(['masters']);
  }

  DeviceClicked(assign:Assignment) {
    this.GetAssetValues();
    localStorage.setItem('selected',JSON.stringify(this.SelectedAsset));
    localStorage.setItem('dassignment',JSON.stringify(assign));
    this._router.navigate(['masters/asset-edge']);
  }

  opendialog() {
    const dialogRef = this.dialog.open(DialogComponent
    );
  }

}
