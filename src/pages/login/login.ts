import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,App,ViewController} from 'ionic-angular';
import {fromDate} from './from.model';
import { loginService } from './login.service';
import {Utils} from '../../helps/utils';
import {User} from '../../model/user.model';
import {toastComponent} from '../../compoent/totas-component/totas-component';
import {socketService} from '../../service/socket.service';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls:['./build/main.css'],
  providers:[loginService,toastComponent]
})
export class LoginPage {
@ViewChild('myNav') nav:NavController
   // fromdate:Array<fromDate>=[];
   subText:string;
   userInfo:User;
   headText:string;
   objs:Array<fromDate>;
   model={};
   indexState:boolean;
  constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public appCtrl:App,
                public viewCtrl:ViewController,
                public loginService:loginService,
                public utils:Utils,
                public toastCtrl:toastComponent,
                public socket:socketService
                ) {
                  this.objs=navParams.get('formData');
    // console.log(this.ut.platForm().then(dd=>console.log(dd)));
  }
  ionViewDidLoad() {
    this.login();
  }
  submit():void{
    let stateNumb:number=0;
    for(let i in this.objs){
    if(this.model[this.objs[i].date].length>0){
      stateNumb++
    
    } else{
      stateNumb--
      
    }
  }
  if(stateNumb===this.objs.length){
    if(this.indexState){
    this.registerCall();  
  }else{
    this.loginCall();
  }
  }else{
    this.toastCtrl.set('message','有未填项');
    this.toastCtrl.popTotas();
  }
  }
  register():void{
      this.objs=[
   new fromDate('用户名','text','username'),
   new fromDate('密码','password','password'),
   new fromDate('邀请码','text','code')
 ];
 this.headText='注册';
 this.indexState=true;
 this.createArr(this.objs);
 this.subText='注册并登录';
  }
  login():void{
     this.objs=[
     new fromDate('用户名','text','username'),
   new fromDate('密码','password','password')
 ];
 this.indexState=false;
 this.headText='登陆';
 this.createArr(this.objs);
 this.subText='登录';
  }
 close():void{
 this.viewCtrl.dismiss();
 }
    // this.appCtrl.getRootNav().push(RegisterPage);

 
 createArr(obj:Array<fromDate>):void{
   for (let i in obj){
    this.model[obj[i].date]='';
 }
 }

 loginCall():void{
      this.loginService.getUser(this.model)
        .subscribe(
                data=>{
                  if(data['code']==='I00000'){
                      this.success(data['data']);
                      
                  }
                  if(data['code']==='E00000'){
                    this.toastCtrl.set('message',data['message']);
                    this.toastCtrl.popTotas();
                  }
                },
                err => {
                  console.log(err)
                }
            );
 }

 registerCall():void{
    this.loginService.register(this.model)
        .subscribe(
                data=>{
                  if(data['code']==='I00000'){
                      this.success(data['data']);
                  }
                  if(data['code']==='E00000'){
                    this.toastCtrl.set('message',data['message']);
                    this.toastCtrl.popTotas();
                  }
                },
                err => {
                  console.log(err)
                }
            );
 }
 success(data:User){
                      this.userInfo=data;
                      if(this.userInfo['Delete']){
                           this.toastCtrl.set('message','此账号已经被封禁');
                    this.toastCtrl.popTotas();
                    return false;
                      }
                      // this.socket.userRecharge(this.userInfo.Id);
                      // this.socket.userCash(this.userInfo.Id);
                      // this.socket.result();
                      this.utils.setLocalStorage('userInfo',this.userInfo);
                      this.viewCtrl.dismiss();
 }

}
