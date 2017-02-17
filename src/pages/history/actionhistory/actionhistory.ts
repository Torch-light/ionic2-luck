import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { historyService } from '../history.service';
import {Utils} from '../../../helps/utils';
/*
  Generated class for the Actionhistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-actionhistory',
  templateUrl: 'actionhistory.html',
  providers:[historyService]
})
export class ActionhistoryPage {
  actionModel:Array<Object>;
	id:number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public historyService:historyService,
              public utils:Utils) {
  	this.id=this.navParams.get('id');
  	
  }
  ionViewWillEnter(){
    this.actionHistory();
  }
  actionHistory(){
    let model={
      id:this.id,
      sTime:this.getTime()+'-00:00:00',
      eTime:this.getTime()+'-23:59:59',
    };
    this.historyService.getActionHistory(model).subscribe(data=>{
      if(data['code']==="E00000"){
        this.utils.popErrorMessage(data['message']);
      }
      this.actionModel=data['data'];
    })
  }
  getTime(){
    let d=new Date();
    return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
  }
}
