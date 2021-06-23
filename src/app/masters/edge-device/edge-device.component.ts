import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MEdge, MEdgeGroupView, MEdgeGroupParam } from 'src/app/Models/site';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastColors } from 'src/app/services/toast-colors';
import { ToastService } from 'src/app/services/toast.service';
import { VsenseapiService } from 'src/app/services/vsenseapi.service';

@Component({
  selector: 'app-edge-device',
  templateUrl: './edge-device.component.html',
  styleUrls: ['./edge-device.component.scss']

})
export class EdgeDeviceComponent implements OnInit {
   
  SelectedEdge:MEdge=new MEdge();
  EdgeFormGroup:FormGroup;
  MEdges:MEdge[]=[];
  Gateways:MEdge[]=[];
  MEdgeGroups:MEdgeGroupView[]=[];
  ParamDataSource:MatTableDataSource<MEdgeGroupParam>=new MatTableDataSource([]);
  ParamdisplayedColumns: string[] = ["ParamID", "Title", "Unit", "LongText", "Min", "Max"];
  Statuses=[{display:"Assigned",value:"10"},{display:"Open",value:"20"},{display:"Non-Usable",value:"90"},{display:"Missed",value:"91"},{display:"Sold",value:"92"},{display:"Scraped",value:"93"}]

  constructor(
    private fb:FormBuilder,
    private service:VsenseapiService,
    private loader:LoaderService,
    private toast:ToastService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.InitializeFormGroup();
  }
  ionViewWillEnter(){
    if(localStorage.getItem('selected')!="undefined"){
      this.SelectedEdge=JSON.parse(localStorage.getItem('selected'));
    }
    this.GetAllEdges();
  }
  InitializeFormGroup(){
    this.EdgeFormGroup=this.fb.group({
      Title:['',Validators.required],
      PutToUse:['',Validators.required],
      SoftwareVersion:['',Validators.required],
      Vcc:[null,Validators.required],
      EdgeGroup:[null,Validators.required],
      Status:[''],
      ParantEdgeID:[null,Validators.required],
      LifeSpan:[null,Validators.required]
    });
  }
  GetAllEdges(){
    this.loader.showLoader();
    this.service.GetMEdges().subscribe(res=>{
      this.MEdges=<MEdge[]>res;
      this.Gateways=this.MEdges.filter(x=>x.ParantEdgeID==null);
      this.service.GetMEdgeGroups().subscribe(res=>{
        this.MEdgeGroups=<MEdgeGroupView[]>res;
        this.LoadSelectedEdge(this.SelectedEdge);
        this.loader.hideLoader();
      },
      err=>{
        console.log(err);
        this.loader.hideLoader();
      });
      this.loader.hideLoader();
    },
    err=>{
      console.log(err);
      this.loader.hideLoader();
    });
  }
  LoadSelectedEdge(mEdge:MEdge){
    this.SelectedEdge=mEdge;
    this.EdgeFormGroup.get('Title').setValue(mEdge.Title);
    this.EdgeFormGroup.get('PutToUse').setValue(mEdge.PuttoUse);
    this.EdgeFormGroup.get('SoftwareVersion').setValue(mEdge.SoftwareVersion);
    this.EdgeFormGroup.get('Vcc').setValue(mEdge.Vcc);
    this.EdgeFormGroup.get('EdgeGroup').setValue(mEdge.EdgeGroup);
    this.EdgeFormGroup.get('Status').setValue(mEdge.Status);
    this.EdgeFormGroup.get('ParantEdgeID').setValue(mEdge.ParantEdgeID);
    this.EdgeFormGroup.get('LifeSpan').setValue(mEdge.Lifespan);
    if(mEdge.EdgeGroup){
      var group=this.MEdgeGroups.find(x=>x.EdgeGroup==mEdge.EdgeGroup);
      if(group!=undefined){
        this.SetParamTable(group.EdgeParams);
      }
      if(mEdge.Status=="10"){
        this.EdgeFormGroup.get('EdgeGroup').disable();
      }
      else{
        this.EdgeFormGroup.get('EdgeGroup').enable();
      }
    }
  }
  showLoaderValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
  ResetControl(): void {
    this.SelectedEdge = new MEdge();
    this.EdgeFormGroup.reset();
    Object.keys(this.EdgeFormGroup.controls).forEach(key => {
      this.EdgeFormGroup.get(key).markAsUntouched();
    });
    this.ParamDataSource=new MatTableDataSource([]);
  }
  SaveEdgeClicked() {
    if (this.EdgeFormGroup.valid) {
      this.loader.showLoader();
      this.GetEdgeValues();
      this.service.SaveMEdge(this.SelectedEdge).subscribe(res => {
        this.loader.hideLoader();
        if(this.SelectedEdge.EdgeID){
          this.toast.showToast("Edge device saved successfully", ToastColors.success);
        }
        else{
          this.toast.showToast("Edge device created successfully", ToastColors.success);
          this.ResetControl();
        }
      },
        err => {
          console.log(err);
          this.loader.hideLoader();
        });
    }
    else {
      this.showLoaderValidationErrors(this.EdgeFormGroup);
    }
  }
  GetEdgeValues() {
    this.SelectedEdge.Title = this.EdgeFormGroup.get('Title').value;
    this.SelectedEdge.PuttoUse = this.EdgeFormGroup.get('PutToUse').value;
    this.SelectedEdge.SoftwareVersion = this.EdgeFormGroup.get('SoftwareVersion').value;
    this.SelectedEdge.Vcc = this.EdgeFormGroup.get('Vcc').value;
    this.SelectedEdge.EdgeGroup = this.EdgeFormGroup.get('EdgeGroup').value;
    this.SelectedEdge.Status = this.EdgeFormGroup.get('Status').value;
    this.SelectedEdge.ParantEdgeID = this.EdgeFormGroup.get('ParantEdgeID').value;
    this.SelectedEdge.Lifespan = this.EdgeFormGroup.get('LifeSpan').value;
  }
  DeleteEdgeClicked() {
    this.loader.showLoader();
    this.service.DeleteMEdge(this.SelectedEdge.EdgeID).subscribe(res => {
      this.loader.hideLoader();
      this.toast.showToast("Edge device deleted successfully", ToastColors.success);
      this.ResetControl();
      this.BackClicked();
    },
      err => {
        console.log(err);
        this.loader.hideLoader();
      });
  }
  GetStatus(value:string):string{
    return this.Statuses.find(x=>x.value==value).display;
  }
  SetParamTable(params:MEdgeGroupParam[]){
    this.ParamDataSource=new MatTableDataSource(params);
  }
  BackClicked(){
    this.router.navigate(['/masters']);
  }
}
