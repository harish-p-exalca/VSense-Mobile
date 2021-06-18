import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Authentication/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./Authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'exceptions',
    loadChildren: () => import('./exceptions/exceptions.module').then( m => m.ExceptionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'livefeed',
    loadChildren: () => import('./livefeed/livefeed.module').then( m => m.LivefeedPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'masters',
    loadChildren: () => import('./masters/masters.module').then( m => m.MastersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
