import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationDetails } from 'src/app/Models/master';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastColors } from 'src/app/services/toast-colors';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginFormGroup: FormGroup;
  PWVisible: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private loader: LoaderService,
    private toast: ToastService
  ) {
    this._authService.islogin(true);
  }


  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      UserName: ["", Validators.required],
      Password: ["", Validators.required],
    });
  }
  get f() { return this.loginFormGroup.controls; }

  loginClicked(): void {
    if (this.loginFormGroup.valid) {
      this.loader.showLoader("Logging in...");
      this._authService
        .login(
          this.loginFormGroup.get("UserName").value,
          this.loginFormGroup.get("Password").value
        )
        .subscribe(
          (data) => {
            const dat = data as AuthenticationDetails;
            console.log(data);
            this.saveUserDetails(dat);
            this.loader.hideLoader();
          },
          (err) => {
            this.loader.hideLoader();
            this.toast.showToast(
              err instanceof Object
                ? "Something went wrong"
                : err,ToastColors.danger
            );
            console.error(err);
          }
        );
    } else {
      Object.keys(this.loginFormGroup.controls).forEach((key) => {
        const abstractControl = this.loginFormGroup.get(key);
        abstractControl.markAsDirty();
      });
    }
  }

  saveUserDetails(data: AuthenticationDetails): void {
    localStorage.setItem("authorizationData", JSON.stringify(data));
    this.toast.showToast("Logged in successfully",ToastColors.success);
    this.router.navigate(['dashboard']);
  }
  ToggleVisible() {
    this.PWVisible = !this.PWVisible;
  }

}
