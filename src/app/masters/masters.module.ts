import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MastersPageRoutingModule } from './masters-routing.module';

import { MastersPage } from './masters.page';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { SiteComponent } from './site/site.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SpaceComponent } from './space/space.component';
import {MatListModule} from '@angular/material/list';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatTabScrollToCenterDirective } from '../shared/scrolling.directive';
import { EdgeDeviceComponent } from './edge-device/edge-device.component';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AssetEdgeComponent } from './asset-edge/asset-edge.component';
import { EdgeGroupComponent } from './edge-group/edge-group.component';
import { AssetComponent } from './asset/asset.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MastersPageRoutingModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    Ng2SearchPipeModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule
    
  ],
  declarations: [
    MastersPage,
    SiteComponent,
    SpaceComponent,
    MatTabScrollToCenterDirective,
    EdgeGroupComponent,
    AssetComponent,
    EdgeDeviceComponent,
    DialogComponent,
    AssetEdgeComponent
  ]
})
export class MastersPageModule {}
