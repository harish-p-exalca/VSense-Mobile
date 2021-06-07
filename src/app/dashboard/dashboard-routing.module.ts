import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlCenterComponent } from './control-center/control-center.component';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path:'control-center',
    component:ControlCenterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
