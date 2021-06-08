import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
})
export class SpaceComponent implements OnInit {
  spaceFormGroup: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.spaceFormGroup = this.fb.group({
      Title: [""],
      Workcenter: [""],
      ParentspaceID: [""],
      SiteID: [""],
      Date: [""],
    });
  }

}
