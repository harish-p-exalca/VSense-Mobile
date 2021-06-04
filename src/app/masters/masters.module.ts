import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MastersPageRoutingModule } from './masters-routing.module';

import { MastersPage } from './masters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MastersPageRoutingModule
  ],
  declarations: [MastersPage]
})
export class MastersPageModule {}
