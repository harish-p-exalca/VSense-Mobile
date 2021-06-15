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
import { ControlcenterLivefeedComponent } from './controlcenter-livefeed/controlcenter-livefeed.component';
import { DeviceListPage } from '../dashboard/device-list/device-list.page';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedModule,
    NgApexchartsModule,
    MatTableModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    GaugeModule.forRoot()
  ],
  declarations: [DashboardPage,ControlCenterComponent,ControlcenterLivefeedComponent,DeviceListPage]
})
export class DashboardPageModule {}
