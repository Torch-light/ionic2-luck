import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,App } from 'ionic-angular';
import {toastComponent} from '../../compoent/totas-component/totas-component';
import {rechargeService} from '../../service/recharge.service';
import {cashService} from './cashService';
import { Utils }    from '../../helps/utils';
import {LoginPage} from '../login/login';
import {Cash} from '../../model/cash.model';
import {CashhistoryPage} from './cashhistory/cashhistory';
/*
  Generated class for the Cash page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cash',
  templateUrl: 'cash.html',
  providers:[cashService]
})
export class CashPage {
  model={
    money:null,
    number:null,
    text:"",
    name:null
  }
  userInfo:any;
  modelObj:Cash;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public totas:toastComponent,
              public cashService:cashService,
              public utils:Utils,
              public modelCtrl:ModalController,
              public appCtrl:App
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CashPage');
    
      this.first();
  }
  first():void{
       this.userInfo=this.utils.isLogin();
    if(!this.userInfo){
        return;
     }
      this.cashService.getCash({type:1}).subscribe(data=>{
        if(data['code']==="E00000"){
          this.utils.popErrorMessage(data['message']);

          // this.totas.set('cssClass','errorTotas');
          // this.totas.set('message',data.data['message'],true);
        }else{
          this.modelObj=data.data;
        }
    },err=>{
      console.log(err)
    })
  }

  login():any{
    let modelLogin=this.modelCtrl.create(LoginPage);
    modelLogin.present();
    modelLogin.onDidDismiss(data => {

   });
    // this.navCtrl.push(LoginPage);
  }
  
  submit():void{
    if(this.model.money<500){
        this.totas.set('cssClass','errorTotas');
        this.totas.set('message','提现积分不能低于500',true);
        return ;
    }
    this.userInfo=this.utils.isLogin();

    if(!this.userInfo){
      this.login();
      return ;
    };
        this.model.name=this.userInfo.UserName;
    this.cash();
  }

  cash():void{
    this.cashService.cash(this.model).subscribe(data=>{
        if(data['code']==="E00000"){
          this.utils.popErrorMessage(data['message']);
          // this.totas.set('cssClass','errorTotas');
          // this.totas.set('message',data.data['message'],true);
        }else{
           this.modelObj=data.data;
        }
    },err=>{
      console.log(err)
    })
  }

  history(){
    this.appCtrl.getRootNav().push(CashhistoryPage,{id:1});
  }
}
