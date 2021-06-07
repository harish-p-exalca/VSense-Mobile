import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MastersPageRoutingModule } from './masters-routing.module';

import { MastersPage } from './masters.page';
import { FlexLayoutModule, FlexModule } from "@angular/flex-layout";
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SharedModule } from '../shared/shared/shared.module';
import { SiteComponent } from './site/site.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MastersPageRoutingModule,
    SharedModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [MastersPage,SiteComponent]
})
export class MastersPageModule {}
