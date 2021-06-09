import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edge-group',
  templateUrl: './edge-group.component.html',
  styleUrls: ['./edge-group.component.scss'],
})
export class EdgeGroupComponent implements OnInit {

  constructor(
    private _router:Router
  ) { }

  ngOnInit() {}

  BackClicked(){
    this._router.navigate(['masters']);
  }

}
