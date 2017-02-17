import { Component} from '@angular/core';
import { NavController, NavParams,ModalController,App,LoadingController } from 'ionic-angular';
// import {ActionPage} from "../action/action";
import {LoginPage} from "../login/login";
import {RechargePage} from "../recharge/recharge";
import {CashPage} from "../cash/cash";
import {toastComponent} from '../../compoent/totas-component/totas-component';
import {CodePage} from "../code/code";
import {Utils} from "../../helps/utils";
import {User} from "../../model/user.model";
import {homeService} from "./home.service";
import {reviewComponent} from "../../compoent/review-component/review";
import {UsermanagerPage} from "../usermanager/usermanager";
import {socketService} from "../../service/socket.service";
import {broadcastService} from "../../service/broadcast.service";
import {ErrorhandlerPage} from "../errorhandler/errorhandler"
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls:['build/main.css'],
  providers:[homeService]
})
export class HomePage {
  boxs:Array<Object>=[];
  islogin:boolean=false;
  userInfo:User;
  points:number=0;
  closeUser:boolean=true;
  reviewCash:number;
  reviewRecharge:number;
  rx:any;
  badge={
    reviewCash:0,
    reviewRecharge:0
  }
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modelCtrl:ModalController,
              public appCtrl:App,
              public utils :Utils,
              public homeService:homeService,
              public toastCtrl:toastComponent,
              public loadingCtrl:LoadingController,
              public socket:socketService
              
                ) {
                  console.log('11111');
  }
 
  
  

  ionViewWillEnter(){
    this.init();
       this.socket.userRecharge(this.userInfo.Id);
    this.socket.userCash(this.userInfo.Id);
}
    ngAfterViewInit(){
    this.init();
    }
  ionViewDidLoad() {
 
  }

  boxInit(){
      this.boxs=[{id:0,name:'充值'},
    {id:1,name:'提现'},
    {id:3,name:'我的资金盘'},
    ]
  }
  errorhandler(){
    this.appCtrl.getRootNav().push(ErrorhandlerPage);
  }
  loginout(){
    this.utils.clearAllLocalStorage();
    this.socket.removeAll();
    this.islogin=false;
  }
  login():any{

      let islogin=this.utils.isLogin();
      if(islogin){

        return false;
      }
    let modelLogin=this.modelCtrl.create(LoginPage);
    modelLogin.present();
    modelLogin.onDidDismiss(data => {
     this.init();

   });
    // this.navCtrl.push(LoginPage);
  }
  boxClick(box):void{
    // this.login();
    switch (box.id){
      case 0:
      
      this.appCtrl.getRootNav().push(RechargePage);
      // this.navCtrl.push(RechargePage);
      break;
      case 1:
      this.appCtrl.getRootNav().push(CashPage);
      break;
      case 2:
      // this.appCtrl.getRootNav().push(MinehistoryPage);
      break;
      case 3:
      break;

    }
  }

  presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 5000);
}

presentLoadingCustom() {
  let loading = this.loadingCtrl.create({
    spinner:'bubbles',
    content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">54545</div>
      </div>`,
    duration: 5000
  });

  loading.onDidDismiss(() => {
    console.log('Dismissed loading');
  });




  loading.present();
}

  
  init():void{
    // this.presentLoadingCustom();
    let islogin=this.utils.isLogin();
    if(islogin){
      this.islogin=true;
      this.userInfo=islogin;
      
      if(this.userInfo.RoleId<10){
        this.boxs=null;
        this.getreview();
      }else{
        this.getPoint();
        this.boxInit();
      }
    }else{
      this.islogin=false;
    }
  }
  review(type:number):void{

    let dobj={
      type:null,
      headText:null
    }
    dobj.type=type;
    if(type){
       dobj.headText='审核提现';
  }else{
     dobj.headText='审核充值';
     
  }

  let modelLogin=this.modelCtrl.create(reviewComponent,{reviewObj:dobj});
    modelLogin.present();
    modelLogin.onDidDismiss(data => {
      this.init();
   });
  }
  
    code():void{
       this.appCtrl.getRootNav().push(CodePage);
   }
   getreview():void{
       this.homeService.getReview()
        .subscribe(
                data=>{
                  
                  if(data['code']==='E00000'){
                    this.toastCtrl.set('message',data['message']);
                    this.toastCtrl.popTotas();
                  }else{
                    this.badge.reviewCash=data.data['reviewCash'];
                    this.badge.reviewRecharge=data.data['reviewRecharge'];
                  }
                },
                err => {
                  console.log(err)
                }
            );
   }
   getPoint():void{
      this.homeService.getPoints({type:'points'})
        .subscribe(
                data=>{
                  
                  if(data['code']==='E00000'){
                   this.utils.popErrorMessage(data['message']);
                  }else{

                    this.utils.setPoint(data['data'].points);
                   this.points=this.utils.getPoint();
                  }
                },
                err => {
                  console.log(err)
                }
            ); 
   }
   userManager():void{
     this.appCtrl.getRootNav().push(UsermanagerPage,{obj:'string'});
   }

   eventBorade(a:boolean){
     console.log(a);
     debugger;
   }
}
