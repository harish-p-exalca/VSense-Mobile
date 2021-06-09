import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
})
export class AssetComponent implements OnInit {

  constructor(
    private _router:Router
  ) { }

  ngOnInit() {}

  BackClicked(){
    this._router.navigate(['masters']);
  }

}
