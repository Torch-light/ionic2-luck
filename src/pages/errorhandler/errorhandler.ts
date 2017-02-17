import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import {errorhandlerService} from './errorhandler.service'
import {Utils} from '../../helps/utils';
import {ErrormangerPage} from './errormanger/errormanger';
/*
  Generated class for the Errorhandler page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-errorhandler',
  templateUrl: 'errorhandler.html',
  providers:[errorhandlerService]
})
export class ErrorhandlerPage {
  model:Object;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public errorhandlerService:errorhandlerService,
              public utils:Utils,
              public appCtrl:App) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ErrorhandlerPage');
  }
  ionViewWillEnter(){
    this.getCathectic();
  }
  getItems(e:Event){
    console.log(Event);
  }

  getCathectic(){
    this.errorhandlerService.getCathectic().subscribe(data=>{
      if(data['code']==="E00000"){
        this.utils.popErrorMessage(data['message']);
        return false;
      }
      this.model=data['data'];
  },err=>{
    console.log(err);
  })
  }

  errorhandlerManger(obj){
    this.appCtrl.getRootNav().push(ErrormangerPage,{item:obj});
  }
}
