import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

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
    private _router:Router
  ) { }

  ngOnInit() {
  }

  BackClicked(){
    this._router.navigate(['dashboard']);
  }
}
