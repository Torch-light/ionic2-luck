import { Component} from '@angular/core';
import {ModalController,NavParams,ViewController} from 'ionic-angular';
import {rechargeService} from '../../service/recharge.service';
import {Recharge} from '../../model/recharge.model';
import {toastComponent} from '../../compoent/totas-component/totas-component';
@Component({
    selector:'review-component',
    templateUrl:'review.html',
    styleUrls:['build/main.css'],
    providers:[rechargeService,toastComponent]
    
})
export class reviewComponent{
    obj:Object;
    modelObj:Recharge;
    constructor(public modelCtrl:ModalController,
                public navParams:NavParams,
                public viewCtrl:ViewController,
                public rechargeService:rechargeService,
                public toast:toastComponent){
                    this.obj=navParams.get('reviewObj');
                    if(this.obj['type']){
                        this.reviewCash()
                    }else{
                        this.reviewRecharge()
                    }
    }
    ionViewDidLoad() {

  }
   close():void{
 this.viewCtrl.dismiss();
 }

 eventBorade():void{

 }
 reviewRecharge():void{
     this.rechargeService.history().
     subscribe(data=>{
         if(data['code']==="E00000"){
             this.toast.set('message',data['message']);
             this.toast.popTotas();
         }else{
             this.modelObj=data['data'];
         }
         console.log(data);
     },err=>{
         console.log(err);
     }
     )
 }
 reviewCash():void{
      this.rechargeService.getCash({type:3}).
     subscribe(data=>{
         if(data['code']==="E00000"){
             this.toast.set('message',data['message']);
             this.toast.popTotas();
         }else{
             this.modelObj=data['data'];
         }
         console.log(data);
     },err=>{
         console.log(err);
     }
     )
 }

 updateRecharge(obj:Recharge,type:boolean):void{
     let model={
         username:obj['name'],
         recharge_id:obj['id'],
         point:obj['money'],
         type:type,
         uid:['uid']
     }
     this.rechargeService.updateRecharge(model).
     subscribe(data=>{
         if(data['code']==="E00000"){
               this.toast.set('message',data['message']);
                    this.toast.popTotas();
         }else{
                this.reviewRecharge()
         }
     },err=>{
         console.log(err);
     })
 }

 updateCash(obj:Recharge,type:boolean):void{
      let model={
         uid:obj['uid'],
         cashId:obj['id'],
         money:obj['money'],
         type:type
     }
     this.rechargeService.updateCash(model).
     subscribe(data=>{
         if(data['code']==="E00000"){
               this.toast.set('message',data['message']);
                    this.toast.popTotas();
         }else{
                this.reviewCash()
         }
     },err=>{
         console.log(err);
     })
 }
}