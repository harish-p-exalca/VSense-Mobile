import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivefeedPageRoutingModule } from './livefeed-routing.module';

import { LivefeedPage } from './livefeed.page';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivefeedPageRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule
  ],
  declarations: [LivefeedPage]
})
export class LivefeedPageModule {}
