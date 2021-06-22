import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    public loadingController: LoadingController
  ) { }

  showLoader(msg: string = "Please wait...") {
    this.loadingController.create({
      message: msg,
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });

  }

  hideLoader() {
    this.loadingController.dismiss().then((res) => {
    }).catch((error) => {
      console.log('error', error);
    });
  }
}
