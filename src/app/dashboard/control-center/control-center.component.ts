import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignParamLogView, ControlCenterFeed } from 'src/app/models/control-center';
import { MonitorTableView } from 'src/app/models/monitor';
import { MEdge } from 'src/app/Models/site';
import { LoaderService } from 'src/app/services/loader.service';
import { VsenseapiService } from 'src/app/services/vsenseapi.service';

@Component({
  selector: 'app-control-center',
  templateUrl: './control-center.component.html',
  styleUrls: ['./control-center.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        minWidth: '64%'
      })),
      state('closed', style({
        minWidth: '0%'
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class ControlCenterComponent implements OnInit {

  SignalIsOpen: boolean = false;
  Assignment: MonitorTableView;
  EdgeDevice: MEdge = new MEdge();
  LastPull: Date = new Date();
  LastLogData: AssignParamLogView[] = [];
  Signals: AssignParamLogView[] = [];
  ControlCenterFeeds: ControlCenterFeed[] = [];

  constructor(
    private _router: Router,
    private loader: LoaderService,
    private service: VsenseapiService
  ) { }

  ngOnInit() {
    this.Assignment = JSON.parse(localStorage.getItem('assignment'));
  }

  ionViewWillEnter() {
    this.GetEdge(this.Assignment.EdgeID);
    this.GetLastLogData(this.Assignment.EdgeID);
    this.GetControlCenterFeeds();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.GetLastLogData(this.Assignment.EdgeID);
    this.GetControlCenterFeeds();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  GetEdge(edgeID: number) {
    this.service.GetMEdge(edgeID).subscribe(res => {
      this.EdgeDevice = <MEdge>res;
    },
      err => {
        console.log(err);
      });
  }

  GetLastLogData(edgeID: number) {
    this.service.GetLastLogOfParams(edgeID).subscribe(res => {
      this.LastLogData = <AssignParamLogView[]>res;
      this.Signals = this.LastLogData.filter(x => x.IsLogExist == true);
      this.LastPull = new Date();
    },
      err => {
        console.log(err);
      });
  }

  GetControlCenterFeeds() {
    this.service.GetControlCenterFeed().subscribe(res => {
      this.ControlCenterFeeds = <ControlCenterFeed[]>res;
    },
      err => {
        console.log(err);
      });
  }

  BackClicked() {
    this._router.navigate(['dashboard/device-list']);
  }
  LiveFeedClicked() {
    localStorage.setItem('feeds', JSON.stringify(this.ControlCenterFeeds));
    this._router.navigate(['dashboard/controlcenter-livefeed']);
  }
  ToggleSignal() {
    this.SignalIsOpen = !this.SignalIsOpen;
  }
  GetTimeDiff(date: string): string {
    let updatedDate = new Date(date);
    let currentDate = new Date();
    let diffMs = (currentDate.getTime() - updatedDate.getTime()); // milliseconds
    let diffDays = Math.floor(diffMs / 86400000); // days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffDays > 0) {
      if (diffDays == 1) {
        return diffDays + " day ago";
      }
      return diffDays + " days ago";
    }
    else if (diffHrs > 0) {
      if (diffHrs == 1 && diffMins == 1) {
        return diffHrs + " hour " + diffMins + "minute ago"
      }
      else if (diffHrs == 1) {
        return diffHrs + " hour ago"
      }
      return diffHrs + " hours ago"
    }
    else {
      if (diffMins < 1) {
        return " just now";
      }
      else if (diffMins == 1) {
        return diffMins + " minute ago";
      }
      return diffMins + " minutes ago";
    }
  }
}
