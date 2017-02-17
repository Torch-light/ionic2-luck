import { Component,EventEmitter,Output } from '@angular/core';
import { ToastController} from 'ionic-angular';
// import {totasModel} from './totas-component';

@Component({
  selector: 'totas-component',
  templateUrl: 'totas.html',
  styleUrls:['build/main.css']
})
export class toastComponent{
      @Output () eventBorade=new EventEmitter<boolean>();
    toastModel={
    message:'头部信息',
    duration: 2500,
    position: 'top',
    showCloseButton:true,
    cssClass:'toastCss',
    closeButtonText:'close'
    }
    constructor(public toastCtrl:ToastController){

    }

    public popTotas(){
        let toast = this.toastCtrl.create(this.toastModel);
        toast.onDidDismiss(() => {
           this.boradcast(); 
            console.log('Dismissed toast');
        });
        toast.present();

    }

    public set(key:string,value:any,call?:boolean){
        this.toastModel[key]=value
        if(call){
            this.popTotas();
        }
    }

    public boradcast(){
        console.log('gb');
        this.eventBorade.emit(false);
    }
}