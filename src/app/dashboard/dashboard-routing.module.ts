import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlCenterComponent } from './control-center/control-center.component';
import { ControlcenterLivefeedComponent } from './controlcenter-livefeed/controlcenter-livefeed.component';

import { DashboardPage } from './dashboard.page';
import { DeviceListPage } from './device-list/device-list.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path:'control-center',
    component:ControlCenterComponent
  },
  {
    path:'controlcenter-livefeed',
    component:ControlcenterLivefeedComponent
  },
  {
    path:'device-list',
    component:DeviceListPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
