import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetEdgeComponent } from './asset-edge/asset-edge.component';
import { DialogComponent } from './dialog/dialog.component';
import { EdgeDeviceComponent } from './edge-device/edge-device.component';
import { AssetComponent } from './asset/asset.component';
import { EdgeGroupComponent } from './edge-group/edge-group.component';

import { MastersPage } from './masters.page';
import { SiteComponent } from './site/site.component';
import { SpaceComponent } from './space/space.component';

const routes: Routes = [
  {
    path: '',
    component: MastersPage
  },
  {
    path: 'site',
    component: SiteComponent
  },
  {
    path: 'space',
    component: SpaceComponent
  },
  {
    path: 'edge-device',
    component: EdgeDeviceComponent
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'asset-edge',
    component: AssetEdgeComponent
  },
  {
    path: 'edge-group',
    component: EdgeGroupComponent
  },
  {
    path: 'asset',
    component: AssetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MastersPageRoutingModule {}
