import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit {
  siteFormGroup: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.siteFormGroup = this.fb.group({
      Title: [""],
      Geolocation: [""],
      Plant: [""],
      Date: [""],
    });
  }

}
