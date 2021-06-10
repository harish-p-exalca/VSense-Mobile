import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit {
  siteFormGroup: FormGroup;
  constructor(private fb: FormBuilder,private _router:Router) {}

  ngOnInit() {
    this.siteFormGroup = this.fb.group({
      Title: [""],
      Geolocation: [""],
      Plant: [""],
      Date: [""],
    });
  }
back(){
  this._router.navigate(['masters']);
}
}
