import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.page.html',
  styleUrls: ['./masters.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class MastersPage implements OnInit {

  MSites=[1,2,3,4,5,6,7,8,9,10];
  selectedIndex:number;
  SearchKey:string;
  constructor(
    private _router:Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.selectedIndex = params['id'];
    });
  }

  BackClicked(){
    this._router.navigate(['dashboard']);
  }

  AddClicked(){
    if(this.selectedIndex==0){
      this._router.navigate(['masters/site']);
    }
    else if(this.selectedIndex==1){
      this._router.navigate(['masters/space']);
    }
    else if(this.selectedIndex==2){
      this._router.navigate(['masters/edge-group']);
    }
    else if(this.selectedIndex==4){
      this._router.navigate(['masters/edge-device']);
    }
    else if(this.selectedIndex==5){
      this._router.navigate(['masters/asset']);
    }
  }

}
