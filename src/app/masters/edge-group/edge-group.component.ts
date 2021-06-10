import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MEdgeGroupParam } from 'src/app/models/vsense';

@Component({
  selector: 'app-edge-group',
  templateUrl: './edge-group.component.html',
  styleUrls: ['./edge-group.component.scss'],
})
export class EdgeGroupComponent implements OnInit,AfterViewInit {

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
    private _fb:FormBuilder
  ) { }

  ngOnInit() {
    this.InitializeFormGroup();
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
