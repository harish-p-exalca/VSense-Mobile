import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-center',
  templateUrl: './control-center.component.html',
  styleUrls: ['./control-center.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        minWidth:'64%'
      })),
      state('closed', style({
        minWidth:'0%'
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

  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }

  BackClicked() {
    this._router.navigate(['device-list']);
  }
  LiveFeedClicked() {
    this._router.navigate(['livefeed']);
  }
  ToggleSignal() {
    this.SignalIsOpen = !this.SignalIsOpen;
  }
}
