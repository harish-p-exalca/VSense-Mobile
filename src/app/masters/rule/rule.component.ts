import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss'],
})
export class RuleComponent implements OnInit {

  RuleFormGroup:FormGroup;

  constructor(
    private _router:Router,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.InitializeFormGroup();
  }

  InitializeFormGroup() {
    this.RuleFormGroup = this._fb.group({
      Title: ['', Validators.required],
      SiteID: [null, Validators.required],
      SpaceID: [null],
      AssetID: [null],
      Threshold: [null],
      SLA: ['', Validators.required],
      Level1: [''],
      Level2: [''],
      Level3: [''],
      Notify1: [''],
      Notify2: [''],
      MailTemplate: ['']
    });
  }

  BackClicked(){
    this._router.navigate(['masters']);
  }
}
