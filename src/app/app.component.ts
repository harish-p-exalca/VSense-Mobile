import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationDetails } from './Models/master';
import { NavItem } from './models/nav-item';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';
import { NavService } from './services/nav.service';
import { ToastColors } from './services/toast-colors';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  @ViewChild("appDrawer") appDrawer: ElementRef;
  IsLogin: boolean = true;
  currentUser: AuthenticationDetails;
  navItems: NavItem[] = [
    {
      displayName: "Dashboard",
      iconName: "monitor",
      isSvgIcon: true,
      route: "dashboard"
    },
    {
      displayName: "Live Feeds",
      iconName: "livefeeds",
      isSvgIcon: true,
      route: "livefeed"
    },
    {
      displayName: "Exceptions",
      iconName: "exception",
      isSvgIcon: true,
      route: "exceptions"
    },
    {
      displayName: "Masters",
      iconName: "master",
      isSvgIcon: true,
      route: "masters"
    },
    {
      displayName: "Settings",
      iconName: "settings",
      isSvgIcon: true,
      route: "settings"
    },
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private navService: NavService,
    private authservice: AuthService,
    private router: Router,
    private loader: LoaderService,
    private toast: ToastService
  ) {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    this.authservice.changeEmitted$.subscribe(
      (value: boolean) => {
        this.IsLogin = value;
      });

    //Icons
    this.matIconRegistry.addSvgIcon(
      "monitor",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/monitor.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "master",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/master.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "exception",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/exception.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "livefeeds",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/livefeeds.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "settings",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/settings.svg")
    );
  }
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  logout() {
    this.loader.showLoader("Signing out...");
    this.authservice.SignOut(this.currentUser.UserID).subscribe(
      (data) => {
        localStorage.clear();
        this.loader.hideLoader();
        this.toast.showToast("Signed out successfully",ToastColors.success);
        this.router.navigate(['login']);
      },
      (err) => {
        this.loader.hideLoader();
        this.toast.showToast(
          err instanceof Object
            ? "Something went wrong"
            : err, ToastColors.danger
        );
        console.error(err);
      }
    );
    this.router.navigate(['login']);
  }
}
