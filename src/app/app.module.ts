import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NavService } from './services/nav.service';
import { MatListModule } from '@angular/material/list';
import { MenuListItemComponent } from './layout/menu-list-item/menu-list-item.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';
import { VsenseapiService } from './services/vsenseapi.service';
import { LoaderService } from './services/loader.service';
import { ToastService } from './services/toast.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuListItemComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule,
    SharedModule,
    MatListModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    NavService,
    AuthService,
    VsenseapiService,
    LoaderService,
    ToastService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
