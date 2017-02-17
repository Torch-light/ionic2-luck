import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {errorhandlerService} from '../errorhandler.service';
import {Utils} from '../../../helps/utils'
/*
  Generated class for the Errormanger page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-errormanger',
  templateUrl: 'errormanger.html',
  providers:[errorhandlerService]
})
export class ErrormangerPage {
  model:Object;
  actionModel:Array<Object>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public errorhandelrService:errorhandlerService,
              public utils:Utils) {
    this.model=this.navParams.get('item');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ErrormangerPage');
  }
  ionViewWillEnter(){
    this.getActionWait();    
  }

  getActionWait(){
    let model={
      cathe_id:this.model['id']
    }
    this.errorhandelrService.getActionWait(model).subscribe(data=>{
          if(data['code']==="E00000"){
            this.utils.popErrorMessage(data['message']);
            return false;
          }
          this.actionModel=data['data'];
      },err=>{
        console.log(err);
      })
  }

  updataAction(obj,type){
    let model={
      type:type,
      aid:obj['id']
    }
    this.errorhandelrService.updataAction(model).subscribe(data=>{
          if(data['code']==="E00000"){
            this.utils.popErrorMessage(data['message']);
            return false;
          }
          
          this.actionModel.forEach((n,item)=>{
            console.log(n);
            console.log(item);
              if(n['id']===data['data']){

              }
          })
      },err=>{
        console.log(err);
      })
  }
}
