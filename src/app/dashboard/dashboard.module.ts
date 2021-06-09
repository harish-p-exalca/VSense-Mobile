import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SharedModule } from '../shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ControlCenterComponent } from './control-center/control-center.component';
import { GaugeModule } from 'angular-gauge';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedModule,
    NgApexchartsModule,
    GaugeModule.forRoot()
  ],
  declarations: [DashboardPage,ControlCenterComponent]
})
export class DashboardPageModule {}
