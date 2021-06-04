import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSiteComponent } from './create-site/create-site.component';

import { MastersPage } from './masters.page';
import { SiteComponent } from './site/site.component';

const routes: Routes = [
  {
    path: '',
    component: MastersPage
  },
  {
    path: 'site',
    component: SiteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MastersPageRoutingModule {}
