import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  value:any=0;
values:any=0;
  constructor() { }

  ngOnInit() {}
yes(){
  localStorage.removeItem("NoValue")
  this.value=1;
  localStorage.setItem("YesValue",this.value)
  console.log(this.value);
  // this.value=0;
  // location.reload();
}
no(){
  localStorage.removeItem("YesValue")
  this.values=2;
  localStorage.setItem("NoValue",this.values)
  console.log(this.values);
  

  // this.value=0;

  // location.reload();
}
}
