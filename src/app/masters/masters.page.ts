import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetView, MEdge, MEdgeGroupView, MSite, MSpace, Rule } from '../Models/site';
import { LoaderService } from '../services/loader.service';
import { VsenseapiService } from '../services/vsenseapi.service';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.page.html',
  styleUrls: ['./masters.page.scss'],
  encapsulation:ViewEncapsulation.None,
  animations: [
    trigger('toggle', [
      state(
        'hidden',
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        'visible',
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('100ms ease-in'))
    ])
  ]
})
export class MastersPage implements OnInit,AfterViewInit {

  @ViewChild("matTab") MatTab:MatTabGroup;
  MSites:MSite[]=[];
  MSpaces:MSpace[]=[];
  MEdges:MEdge[]=[];
  Gateways:MEdge[]=[];
  MGroups:MEdgeGroupView[]=[];
  Rules: Rule[] = [];
  AssetViews: AssetView[] = [];
  selectedIndex:number=0;
  SearchKey:string;
  IsSearch:boolean=false;
  IsVisible:boolean;

  constructor(
    private _router:Router,
    private _route: ActivatedRoute,
    private service:VsenseapiService,
    private loader:LoaderService
  ) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if(params['id']){
        this.selectedIndex = params['id'];
      }
      this.GetMaster(this.selectedIndex);
    });
  }
  ionViewWillEnter(){
    localStorage.removeItem('selected');
    localStorage.removeItem('dassignment');
  }
  ngAfterViewInit(){
    const HeaderWidth=window.innerWidth-32+'px';
    this.MatTab._elementRef.nativeElement.style.setProperty('--header-width',HeaderWidth);
  }

  BackClicked(){
    this._router.navigate(['dashboard']);
  }

  LoadSelected(selected:any=undefined){
    localStorage.setItem('selected',JSON.stringify(selected));
    if(this.selectedIndex==0){
      this._router.navigate(['masters/site']);
    }
    else if(this.selectedIndex==1){
      this._router.navigate(['masters/space']);
    }
    else if(this.selectedIndex==2){
      this._router.navigate(['masters/edge-group']);
    }
    else if(this.selectedIndex==3){
      this._router.navigate(['masters/gateway']);
    }
    else if(this.selectedIndex==4){
      this._router.navigate(['masters/edge-device']);
    }
    else if(this.selectedIndex==5){
      this._router.navigate(['masters/asset']);
    }
    else if(this.selectedIndex==6){
      this._router.navigate(['masters/rule']);
    }
  }

  onScroll(event) {
    if (event.detail.deltaY > 0 && this.IsVisible) return;
    if (event.detail.deltaY < 0 && !this.IsVisible) return;
    if (event.detail.deltaY > 0) {
      this.IsVisible = true;
    } else {
      this.IsVisible = false;
    };
  };

  ToggleSearch(){
    if(this.IsSearch){
      this.SearchKey="";
    }
    this.IsSearch=!this.IsSearch;
  }

  onTabChanged($event){
    this.GetMaster($event.index)
  }

  GetMaster(index:number){
    if(index==0){
      this.GetAllSites();
    }
    else if(index==1){
      this.GetAllSpaces();
    }
    else if(index==2){
      this.GetAllGroups();
    }
    else if(index==3){
      this.GetAllEdges();
    }
    else if(index==4){
      this.GetAllEdges();
    }
    else if(index==5){
      this.GetAllAssets();
    }
    else if(index==6){
      this.GetAllRules();
    }
  }

  GetAllSites(){
    this.loader.showLoader();
    this.service.GetMSites().subscribe(res=>{
      this.MSites=<MSite[]>res;
      this.loader.hideLoader();
    },
    err=>{
      console.log(err);
      this.loader.hideLoader();
    });
  }

  GetAllSpaces(){
    this.loader.showLoader();
    this.service.GetMSpaces().subscribe(res=>{
      this.MSpaces=<MSpace[]>res;
      this.loader.hideLoader();
    },
    err=>{
      console.log(err);
      this.loader.hideLoader();
    });
  }

  GetAllGroups(){
    this.loader.showLoader();
    this.service.GetMEdgeGroups().subscribe(res=>{
      this.MGroups=<MEdgeGroupView[]>res;
      this.loader.hideLoader();
    },
    err=>{
      console.log(err);
      this.loader.hideLoader();
    })
  }

  GetAllEdges(){
    this.loader.showLoader();
    this.service.GetMEdges().subscribe(res=>{
      this.MEdges=<MEdge[]>res;
      this.Gateways=this.MEdges.filter(x=>x.ParantEdgeID==null);
      this.MEdges=this.MEdges.filter(x=>x.ParantEdgeID!=null);
      this.loader.hideLoader();
    },
    err=>{
      console.log(err);
      this.loader.hideLoader();
    });
  }

  GetAllAssets() {
    this.loader.showLoader();
    this.service.GetMAssets().subscribe(res => {
      this.AssetViews = <AssetView[]>res;
      this.loader.hideLoader();
    },
    err => {
      this.loader.hideLoader();
      console.log(err);
    });
  }

  GetAllRules() {
    this.loader.showLoader();
    this.service.GetRules().subscribe(res => {
      this.Rules = <Rule[]>res;
      this.loader.hideLoader();
    },
      err => {
        console.log(err);
        this.loader.hideLoader();
      })
  }

}
