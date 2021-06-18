import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss'],
})
export class GatewayComponent implements OnInit {

  GatewayFormGroup:FormGroup;

  constructor(
    private _router:Router,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.InitializeFormGroup();
  }

  InitializeFormGroup() {
    this.GatewayFormGroup = this._fb.group({
      Title:['',Validators.required],
      PutToUse:['',Validators.required],
      SoftwareVersion:['',Validators.required],
      Vcc:[null,Validators.required],
      EdgeGroup:[null],
      LifeSpan:[null,Validators.required]
    });
  }

  BackClicked(){
    this._router.navigate(['masters']);
  }

}
