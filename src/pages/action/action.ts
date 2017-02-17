import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { actionModel } from './action.model';
import { actionService } from './action.service';
import {homeService} from "../home/home.service";
import {Utils} from "../../helps/utils";
import {actionFilterPipe} from "../../pipe/action.pipe";
import {socketService} from "../../service/socket.service";
import {broadcastService} from "../../service/broadcast.service";
/*
  Generated class for the Action page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-action',
  templateUrl: 'action.html',
  providers:[actionService,homeService,actionFilterPipe]
})
export class ActionPage {
  actionModel:Array<actionModel>;
  modelData:Array<any>;
  stystemState:boolean;
  interVel:any;
  cathe:number;
  time:number;
  num:number;
  islogin:boolean=false;
  model={
    money:null
  };
  broadcast:any;
  resule:Array<Object>=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionService:actionService,
              public homeService:homeService,
              public utils:Utils,
              public socketService:socketService) 
  {
      this.init();

  }

  init(){
    this.actionModel=[
      new actionModel('小',1,false,0,2,2),
      new actionModel('大',2,false,0,2,1),
      new actionModel('单',3,false,0,2,6),
      new actionModel('双',6,false,0,2,3),
      new actionModel('十三',13,false,0,2,14),
      new actionModel('十四',14,false,0,2,13),
    ]
  } 
  ionViewDidLoad() {
    // console.log(this.utils.getPoint());
    // console.log('ionViewDidLoad ActionPage');
    // this.utils.re(1000);
    
  }
  ionViewWillEnter(){
    this.islogin=this.utils.isLogin();
    if(!this.islogin){
      return false;
    }
    this.getAction();
    this.actionEmit();
  }
  actionEmit(){
        this.socketService.result((obj)=>{
       this.getAction();
    });
  }
  ionViewWillLeave(){
       if(this.interVel){
         clearInterval(this.interVel);
       }
     // this.socketService.remove('result');
  }
  selectAction(obj:actionModel,i:number){
      obj['isSelect']=!obj['isSelect'];
      // this.actionModel[i].isSelect=!this.actionModel[i].isSelect;

     if(obj['isSelect']){
             this.actionService.filterDate(obj,i,this.actionModel,this.resule)

     }else{
       this.resule.forEach((n,index)=>{
         if(n['type']==obj['type']){
           this.resule.splice(index,1);
         }
       })
     }


}


  submit(){
    let i=0;
    let model={
      num:this.num+1,
      money:parseInt(this.model.money),
      type:"",
      multiple:0
    }
       this.actionModel.forEach((n,index)=>{
           if(n['isSelect']){
             i++;
             model.type+=n['value'];

             if(n['type']>=13&&model.money>2000){
                            model.multiple=1.5;
             }else{
                             model.multiple+=n['multiple'];               
             }

           }
       })
       if(!i){
           this.utils.popErrorMessage('请选择类型');
           return ;
       }
       if(model.money>this.utils.getPoint()){
          this.utils.popErrorMessage('积分不足'); 
          return ;
       }
       this.action(model);
     }

     action(obj){
       console.log(obj);
       this.actionService.action(obj).subscribe(data=>{
         if(data['code']==="E00000"){
           this.utils.popErrorMessage(data['message']);
         }else{
           this.modelData.push(data['data']);
           console.log(this.modelData);
         }
       },err=>{
         console.log(err);
       })
     }

     stystem(){
       this.actionService.stystem().subscribe(data=>{
           if(data['code']==="E00000"){
             this.utils.popErrorMessage(data['message']);
           }else{
             this.stystemState=data['data']['updateNum'];
             if(!this.stystemState){

             }
           }
       },err=>{

       })
     }

     settime(time){
       this.time=time;
       this.interVel=setInterval(()=>{
          this.time--;
          if(this.time<0){
             clearInterval(this.interVel);
             this.stystemState=true;     
          }
      
       },1000);
     }

     getAction(){
         this.actionService.getAction().subscribe(data=>{
           if(data['code']==="E00000"){
             this.utils.popErrorMessage(data['message']);
           }else{
              this.filter(data['data']);  
           }
       },err=>{
         console.log(err);
       })
     }
     delAction(obj){
       console.log(obj);
          this.actionService.delAction(obj).subscribe(data=>{
           if(data['code']==="E00000"){
             this.utils.popErrorMessage(data['message']);
           }else if(data['code']==="I00000"){
               this.modelData.forEach((n,item)=>{
                    if(n.id===data['data']['id']){
                      this.modelData.splice(item,1);
                    }
               })
           }
       },err=>{
         console.log(err);
       }) 
     }
     filter(obj:Object){
       // let num=0;
           this.stystemState=obj['system']['updateNum'];
           this.modelData=obj['action'];
           this.settime(obj['time']);
           // obj['cathe'].num=obj['cathe'].num.split(",");
           this.cathe=obj['cathe'];
           // this.cathe['num'].forEach((item,index,array)=>{
           //   num+=parseInt(item);
           // })
           this.cathe=parseInt(this.cathe['num']);
           this.num=obj['cathe']['id'];
     }
}
