import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Assignment, MEdge, MEdgeAssignParam, MEdgeGroupParam, MEdgeGroupView } from 'src/app/Models/site';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastColors } from 'src/app/services/toast-colors';
import { ToastService } from 'src/app/services/toast.service';
import { VsenseapiService } from 'src/app/services/vsenseapi.service';


@Component({
  selector: 'app-asset-edge',
  templateUrl: './asset-edge.component.html',
  styleUrls: ['./asset-edge.component.scss'],
})
export class AssetEdgeComponent {

  ParamdisplayedColumns: string[] = ["PramID", "Title", "Unit", "LongText", "Min", "Max", "Icon", "Soft1ExceptionThreshold",
    "Soft2ExceptionThreshold", "Hard1ExceptionThreshold", "Hard2ExceptionThreshold", "ActivityGraphTitle", "Status", "Action"];
  ParamDataSource: MatTableDataSource<MEdgeAssignParam>;
  SelectedEdge: Assignment = new Assignment();
  AllEdges: MEdge[] = [];
  EdgeGroups: MEdgeGroupView[] = [];
  GroupParams: MEdgeGroupParam[] = [];
  paramExist: number;

  constructor(
    private _router: Router,
    private service: VsenseapiService,
    private loader: LoaderService,
    private toast: ToastService
  ) { }

  ionViewWillEnter() {
    if(localStorage.getItem('dassignment')!="undefined"){
      this.SelectedEdge=JSON.parse(localStorage.getItem('dassignment'));
    }
    this.GetMasters();
  }
  GetMasters() {
    this.loader.showLoader();
    this.service.GetMEdgeGroups().subscribe(x => {
      this.EdgeGroups = <MEdgeGroupView[]>x;
      this.service.GetMEdges().subscribe(res => {
        this.AllEdges = <MEdge[]>res;
        this.LoadSelectedEdge(this.SelectedEdge);
        this.loader.hideLoader();
      },
        err => {
          this.loader.hideLoader();
          console.log(err);
        });
    },
      err => {
        this.loader.hideLoader();
        console.log(err);
      });
  }
  LoadSelectedEdge(selected: Assignment) {
    this.SelectedEdge = selected;
    var edge = this.AllEdges.find(x => x.EdgeID == this.SelectedEdge.EdgeID);
    var group = this.EdgeGroups.find(x => x.EdgeGroup == edge.EdgeGroup);
    if (group != undefined) {
      this.GroupParams = group.EdgeParams;
    }
    else {
      this.GroupParams = [];
    }
    this.ParamDataSource = new MatTableDataSource(this.SelectedEdge.AssignParams);
  }
  AddAssignParam() {
    if (this.GroupParams.length == this.SelectedEdge.AssignParams.length) {
      this.toast.showToast("All parameters assigned", ToastColors.danger);
      return;
    }
    var param = new MEdgeAssignParam();
    this.SelectedEdge.AssignParams.push(param);
    this.ParamDataSource = new MatTableDataSource(this.SelectedEdge.AssignParams);
  }
  DeleteAssignParam(index: number) {
    this.SelectedEdge.AssignParams.splice(index, 1);
    this.ParamDataSource = new MatTableDataSource(this.SelectedEdge.AssignParams);
  }
  ParamSelect(param: string, index: any) {
    this.paramExist = 0;
    this.SelectedEdge.AssignParams.forEach(element => {
      if (element.PramID == param && element.PramID != null) {
        this.paramExist += 1;
      }
    });
    if (this.paramExist > 1) {
      this.toast.showToast("param already exists", ToastColors.danger);
      this.SelectedEdge.AssignParams[index].PramID = "";
      this.SelectedEdge.AssignParams[index].Title = "";
      this.SelectedEdge.AssignParams[index].Unit = "";
      this.SelectedEdge.AssignParams[index].LongText = "";
      this.SelectedEdge.AssignParams[index].Max = null;
      this.SelectedEdge.AssignParams[index].Min = null;
      this.SelectedEdge.AssignParams[index].Icon = "";
      this.SelectedEdge.AssignParams[index].Soft1ExceptionThreshold = null;
      this.SelectedEdge.AssignParams[index].Soft2ExceptionThreshold = null;
      this.SelectedEdge.AssignParams[index].Hard1ExceptionThreshold = null;
      this.SelectedEdge.AssignParams[index].Hard2ExceptionThreshold = null;
      this.SelectedEdge.AssignParams[index].ActivityGraphTitle = "";
    }
    else {
      var Param = this.GroupParams.find(x => x.ParamID == param);
      this.SelectedEdge.AssignParams[index].Title = Param.Title;
      this.SelectedEdge.AssignParams[index].Unit = Param.Unit;
      this.SelectedEdge.AssignParams[index].LongText = Param.LongText;
      this.SelectedEdge.AssignParams[index].Max = Param.Max;
      this.SelectedEdge.AssignParams[index].Min = Param.Min;
      this.SelectedEdge.AssignParams[index].Icon = Param.Icon;
    }
  }
  ToggleParamStatus(index: number) {
    this.SelectedEdge.AssignParams[index].IsActive = !this.SelectedEdge.AssignParams[index].IsActive;
  }
  SaveClicked(isSave:boolean=false){
    if(isSave){
      localStorage.setItem('dassignment',JSON.stringify(this.SelectedEdge));
    }
    this._router.navigate(['/masters/asset']);
  }
}
