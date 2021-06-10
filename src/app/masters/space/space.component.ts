import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
})
export class SpaceComponent implements OnInit {
  spaceFormGroup: FormGroup;
  constructor(private fb: FormBuilder,private _router:Router) {}
  ngOnInit() {
    this.spaceFormGroup = this.fb.group({
      Title: [""],
      Workcenter: [""],
      ParentspaceID: [""],
      SiteID: [""],
      Date: [""],
    });
  }
  back(){
    this._router.navigate(['masters']);
  }
}
