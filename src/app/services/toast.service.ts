import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastColors } from './toast-colors';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  showToast(msg:string,color:ToastColors=ToastColors.primary) {
    
    this.toastController.create({
      message: msg,
      duration:2000,
      position: 'bottom',
      color:this.ToastColor(color),
      animated:true
    }).then((obj) => {
      obj.present();
    });
  }
  // showOnceToast() {
  //   this.toastController.dismiss().then((obj) => {
  //   }).catch(() => {
  //   }).finally(() => {
  //     this.showToast();
  //   });
  // }
  ToastColor(color:ToastColors):string{
    var ToastColor="primary";
    switch (color) {
      case ToastColors.secondary:
        ToastColor="secondary"
        break;
      case ToastColors.tertiary:
        ToastColor="tertiary"
        break;
      case ToastColors.success:
        ToastColor="success"
        break;
      case ToastColors.warning:
        ToastColor="warning"
        break;
      case ToastColors.danger:
        ToastColor="danger"
        break;
      case ToastColors.light:
        ToastColor="light"
        break;
      case ToastColors.medium:
        ToastColor="medium"
        break;
      default:
        break;
    }
    return ToastColor;
  }
}
