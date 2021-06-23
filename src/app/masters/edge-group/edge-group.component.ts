import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MEdgeGroupView } from 'src/app/Models/site';
import { MEdgeGroupParam } from 'src/app/models/vsense';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastColors } from 'src/app/services/toast-colors';
import { ToastService } from 'src/app/services/toast.service';
import { VsenseapiService } from 'src/app/services/vsenseapi.service';

@Component({
  selector: 'app-edge-group',
  templateUrl: './edge-group.component.html',
  styleUrls: ['./edge-group.component.scss'],
})
export class EdgeGroupComponent implements OnInit,AfterViewInit {

  SelectedGroup:MEdgeGroupView=new MEdgeGroupView();
  GroupFormGroup:FormGroup;
  GroupParamDisplayedColumns:string[]=["ParamID","Title","Unit","LongText","Min","Max","Icon","IsPercentage","Color","Action"];
  GroupParamDataSource:any=new BehaviorSubject<AbstractControl[]>([]);
  GroupParamFormArray:FormArray=this._fb.array([]);
  TableHeight:number=0;
  DefaultParams = [{
    ParamID: "VIBR",
    Title: "VIBRATION",
    Unit: "Hz",
  },
  {
    ParamID: "TEMP",
    Title: "TEMPERATURE",
    Unit: "°C",
  },
  {
    ParamID: "CRNT",
    Title: "CURRENT",
    Unit: "mA",
  },
  {
    ParamID: "HUMD",
    Title: "HUMIDITY",
    Unit: "kgm^-1",
  }];

  constructor(
    private _router:Router,
    private _fb:FormBuilder,
    private loader:LoaderService,
    private toast:ToastService,
    private service:VsenseapiService
  ) { }

  ngOnInit() {
    this.InitializeFormGroup();
  }
  ionViewWillEnter(){
    if(localStorage.getItem('selected')!="undefined"){
      this.SelectedGroup=JSON.parse(localStorage.getItem('selected'));
    }
    this.LoadSelectedGroup(this.SelectedGroup);
  }
  ngAfterViewInit(){
    this.TableHeight=window.innerHeight-220;
  }
  BackClicked(){
    this._router.navigate(['masters']);
  }

  InitializeFormGroup(){
    this.GroupFormGroup=this._fb.group({
      Title:['',Validators.required],
      GroupParams:this.GroupParamFormArray
    });
  }

  LoadSelectedGroup(mGroup:MEdgeGroupView){
    this.GroupFormGroup.get('Title').setValue(mGroup.Title);
    this.GroupParamFormArray.clear();
    mGroup.EdgeParams.forEach(param => {
      this.AddRow(param);
    });
  }

  PatchDefaultValues(param:MEdgeGroupParam,index:number){
    const ParamArray=this.GroupFormGroup.get("GroupParams") as FormArray;
    const ParamControl=ParamArray.controls[index] as FormControl;
    ParamControl.reset();
    ParamControl.patchValue({
      ParamID:param.ParamID,
      Title:param.Title,
      Unit:param.Unit,
      LongText:param.LongText
    });
  }

  AddRow(Param: MEdgeGroupParam) {
    this.GroupParamFormArray.push(this._fb.group({
      ParamID: [Param.ParamID, Validators.required],
      Title:[Param.Title,Validators.required],
      Unit: [Param.Unit, Validators.required],
      LongText:[Param.LongText],
      Min: [Param.Min, Validators.required],
      Max:[Param.Max,Validators.required],
      Icon: [Param.Icon],
      IsPercentage:[Param.IsPercentage],
      Color: [Param.Color]
    }));
    this.GroupParamDataSource.next(this.GroupParamFormArray.controls);
  }

  AddParamClicked(){
    this.AddRow(new MEdgeGroupParam());
  }

  DeleteRow(index: any) {
    this.GroupParamFormArray.removeAt(index);
    this.GroupParamDataSource.next(this.GroupParamFormArray.controls);
  }

  ResetControl(): void {
    this.SelectedGroup = new MEdgeGroupView();
    this.GroupFormGroup.reset();
    Object.keys(this.GroupFormGroup.controls).forEach(key => {
      this.GroupFormGroup.get(key).markAsUntouched();
    });
    this.GroupParamFormArray.clear();
    this.GroupParamDataSource.next(this.GroupParamFormArray.controls);
  }

  SaveGroupClicked() {
    if (this.GroupFormGroup.valid) {
      this.loader.showLoader();
      this.GetGroupValues();
      this.service.SaveMEdgeGroup(this.SelectedGroup).subscribe(res => {
        this.loader.hideLoader();
        if(this.SelectedGroup.EdgeGroup){
          this.toast.showToast("Edge group saved successfully", ToastColors.success);
        }
        else{
          this.toast.showToast("Edge group created successfully", ToastColors.success);
          this.ResetControl();
        }
      },
        err => {
          console.log(err);
          this.loader.hideLoader();
        });
    }
    else {
      this.ShowValidationErrors(this.GroupFormGroup);
    }
  }
  GetGroupValues() {
    this.SelectedGroup.Title = this.GroupFormGroup.get('Title').value;
    const Params = this.GroupFormGroup.get('GroupParams') as FormArray;
      this.SelectedGroup.EdgeParams=[];
      Params.controls.forEach((x) => {
        var param=new MEdgeGroupParam();
        param.ParamID=x.get('ParamID').value;
        param.Title=x.get('Title').value;
        param.Unit=x.get('Unit').value;
        param.LongText=x.get('LongText').value;
        param.Min=x.get('Min').value;
        param.Max=x.get('Max').value;
        param.Icon=x.get('Icon').value;
        param.IsPercentage=x.get('IsPercentage').value;
        param.Color=x.get('Color').value;
        this.SelectedGroup.EdgeParams.push(param);
      });
  }
  DeleteGroupClicked() {
    this.loader.showLoader();
    this.service.DeleteMEdgeGroup(this.SelectedGroup.EdgeGroup).subscribe(res => {
      this.loader.hideLoader();
      this.toast.showToast("Edge group deleted successfully", ToastColors.success);
      this.ResetControl();
      this.BackClicked();
    },
      err => {
        console.log(err);
        this.loader.hideLoader();
      });
  }

  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
      if (formGroup.get(key) instanceof FormArray) {
        const FormArrayControls = formGroup.get(key) as FormArray;
        Object.keys(FormArrayControls.controls).forEach(key1 => {
          if (FormArrayControls.get(key1) instanceof FormGroup) {
            const FormGroupControls = FormArrayControls.get(key1) as FormGroup;
            Object.keys(FormGroupControls.controls).forEach(key2 => {
              FormGroupControls.get(key2).markAsTouched();
              FormGroupControls.get(key2).markAsDirty();
            });
          } else {
            FormArrayControls.get(key1).markAsTouched();
            FormArrayControls.get(key1).markAsDirty();
          }
        });
      }
    });
  }

}
