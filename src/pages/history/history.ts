import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import {ActionhistoryPage} from './actionhistory/actionhistory';
import {historyService} from './history.service';
import {Utils} from '../../helps/utils';

/*
  Generated class for the History page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  providers:[historyService]
})
export class HistoryPage {
  @ViewChild('conten') conten;
  model:Array<any>;
  constructor(public navCtrl: NavController,
  			      public navParams: NavParams,
  			      public appCtrl:App,
              public historyService:historyService,
              public utils:Utils) {}

  ionViewDidLoad() {
    console.log(this.conten);
    console.log('ionViewDidLoad HistoryPage');
  }
  ionViewWillEnter(){
    this.history();
  }
  actionHistory(){
    let isLogin=this.utils.isLogin();
    if(!isLogin){
      return false;
    }
  	this.appCtrl.getRootNav().push(ActionhistoryPage,{id:isLogin.Id});
  }

  history(){
    this.historyService.getHistory().subscribe(data=>{
        if(data['code']==="E00000"){
          this.utils.popErrorMessage(data['message']);
        }
        this.model=data['data']['data'];
        
    },err=>{
      console.log(err);
    })
  }
}
