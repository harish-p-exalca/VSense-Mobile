import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.page.html',
  styleUrls: ['./masters.page.scss'],
  encapsulation:ViewEncapsulation.None,
  animations: [
    trigger('toggle', [
      state(
        'hidden',
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        'visible',
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('100ms ease-in'))
    ])
  ]
})
export class MastersPage implements OnInit,AfterViewInit {

  @ViewChild("matTab") MatTab:MatTabGroup;
  MSites=[1,2,3,4,5,6,7,8,9,10];
  selectedIndex:number=0;
  SearchKey:string;
  IsSearch:boolean=false;
  IsVisible:boolean;

  constructor(
    private _router:Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if(params['id']){
        this.selectedIndex = params['id'];
      }
    });
  }

  ngAfterViewInit(){
    const HeaderWidth=window.innerWidth-32+'px';
    this.MatTab._elementRef.nativeElement.style.setProperty('--header-width',HeaderWidth);
  }

  BackClicked(){
    this._router.navigate(['dashboard']);
  }

  AddClicked(){
    if(this.selectedIndex==0){
      this._router.navigate(['masters/site']);
    }
    else if(this.selectedIndex==1){
      this._router.navigate(['masters/space']);
    }
    else if(this.selectedIndex==2){
      this._router.navigate(['masters/edge-group']);
    }
    else if(this.selectedIndex==3){
      this._router.navigate(['masters/gateway']);
    }
    else if(this.selectedIndex==4){
      this._router.navigate(['masters/edge-device']);
    }
    else if(this.selectedIndex==5){
      this._router.navigate(['masters/asset']);
    }
    else if(this.selectedIndex==6){
      this._router.navigate(['masters/rule']);
    }
  }

  onScroll(event) {
    if (event.detail.deltaY > 0 && this.IsVisible) return;
    if (event.detail.deltaY < 0 && !this.IsVisible) return;
    if (event.detail.deltaY > 0) {
      this.IsVisible = true;
    } else {
      this.IsVisible = false;
    };
  };

  ToggleSearch(){
    this.IsSearch=!this.IsSearch;
  }
}
