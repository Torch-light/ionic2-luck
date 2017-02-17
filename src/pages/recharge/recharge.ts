import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,ModalController,App } from 'ionic-angular';
import { Http }    from '@angular/http';
import { Utils }    from '../../helps/utils';
import { User }    from '../../model/user.model';
import {rechargeService} from './recharge.service';
import {LoginPage} from '../login/login';
import {RechargehistoryPage} from './rechargehistory/rechargehistory';
import {Recharge} from '../../model/recharge.model';
import {toastComponent} from '../../compoent/totas-component/totas-component';
/*
  Generated class for the Recharge page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
  providers:[rechargeService]
})
export class RechargePage {
  userInfo:User;
  modelObj:Recharge;
  isShow:boolean=false;
  options:Array<string>=[
    '微信',
    '支付宝'
    ];
  payType:string='微信';
  rechargeText:string;
  totasObject={
    message: '还有充值等待审核',
    duration: 3000,
    position: 'top',
    showCloseButton:true,
    cssClass:'toastCss',
    closeButtonText:'close'
  }
  model:any={
    money:null,
    paytype:0
  };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public http:Http,
              public utils:Utils,
              public rechargeService:rechargeService,
              public totas:toastComponent,
              public modelCtrl:ModalController,
              public appCtrl:App
              ) {
  }

  ionViewDidLoad() {
    this.frist();  
    // this.totas.set('message','这是recharge',true);
    // this.totas.popTotas();
  }
  login():any{
    let modelLogin=this.modelCtrl.create(LoginPage);
    modelLogin.present();
    modelLogin.onDidDismiss(data => {
      this.frist();
   });
    // this.navCtrl.push(LoginPage);
  }

  frist():void{
    this.userInfo=this.utils.isLogin();
    if(!this.userInfo){
        return;
     }
       this.rechargeService.history().subscribe(
      data=>{
        if(data['code']==="E00000"){
            this.totas.set('message',data['message']);
            this.totas.set('cssClass','errorTotas');
            this.totas.popTotas();
        }else if(data['data']){
          
          this.modelObj=data['data'];
          this.isShow=true;
          
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  selectPayType(options):void{
      this.payType=options;
      if(options==='微信'){
        this.model.paytype=0;
      }else{
        this.model.payType=1;
      }
  }
  updateRecharge(obj:Recharge,type:number):void{
      let model={
      // id:this.userInfo['Id'],
      id:obj.id,
      type:type
    }
    this.rechargeText=this.payType;
    this.rechargeService.updateRecharge(model).subscribe(
      data=>{
        
        if(data['code']==="E00000"){
            this.totas.set('message',data['message']);
            this.totas.set('cssClass','errorTotas');
            this.totas.popTotas();
        }
        if(type){
          this.modelObj['state']=1;
        }else{
        this.modelObj=null;
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  sureRecharge(obj:Recharge):void{

  }
// presentToast() {
//   let toast = this.toastCtrl.create(this.totasObject);

//   toast.onDidDismiss(() => {
//     console.log('Dismissed toast');
//     if(this.model.money){
//       this.model.money=null;
//     }
//   });

//   toast.present();
// }
  submit():void{
    if(!this.userInfo){
      this.login();
      return;
    }
    if(this.modelObj&&this.modelObj['state']!==2){
       this.totas.set('message','还有未审核订单');
            this.totas.set('cssClass','errorTotas');
            this.totas.popTotas();
            return ;
    }
    let model={
      // id:this.userInfo['Id'],
      money:this.model.money,
      recharge_type:this.model.paytype
    }
    this.rechargeText=this.payType;
    this.rechargeService.recharge(model).subscribe(
      data=>{
        if(data['code']==="E00000"){
            this.totas.set('message',data['message']);
            this.totas.set('cssClass','errorTotas');
            this.totas.popTotas();
        }else{
           this.modelObj=data['data'];
          this.isShow=true;
        }
      },
      error=>{
        console.log(error)
      }
    )
    // this.presentToast();
  }
  
  get getRecharge():string{
    return '123';
  }
  
  eventBorade(a:boolean){
    console.log('123');
  }

  history(){
    this.appCtrl.getRootNav().push(RechargehistoryPage,{id:1})
  }
}
