import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavItem } from './models/nav-item';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  @ViewChild("appDrawer") appDrawer: ElementRef;
  navItems: NavItem[] = [
    {
      displayName:"Dashboard",
      iconName:"monitor",
      isSvgIcon:true,
      route: "dashboard"
    },
    {
      displayName:"Live Feeds",
      iconName:"livefeeds",
      isSvgIcon:true,
      route: "livefeed"
    },
    {
      displayName:"Exceptions",
      iconName:"exception",
      isSvgIcon:true,
      route: "exceptions"
    },
    {
      displayName:"Masters",
      iconName:"master",
      isSvgIcon:true,
      route: "masters"
    },
    {
      displayName:"Settings",
      iconName:"settings",
      isSvgIcon:true,
      route: "settings"
    },
  ];
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private navService: NavService
  ) {
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
}
