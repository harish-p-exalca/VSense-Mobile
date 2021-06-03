import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGroup: FormGroup;
  constructor(private fb: FormBuilder) {}
  hide = true;
  toggleabcd:boolean = true;
  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      UserName: [""],
      Password: [""],
    });
  }
  show(){
    this.toggleabcd=false;
  }
}
