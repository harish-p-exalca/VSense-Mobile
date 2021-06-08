import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-center',
  templateUrl: './control-center.component.html',
  styleUrls: ['./control-center.component.scss'],
})
export class ControlCenterComponent implements OnInit {

  constructor(
    private _router:Router
  ) { }

  ngOnInit() {}

  BackClicked(){
    this._router.navigate(['dashboard']);
  }

}
