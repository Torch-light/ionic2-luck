import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {codeService} from './code.service'
import {toastComponent} from '../../compoent/totas-component/totas-component';
/*
  Generated class for the Code page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-code',
  templateUrl: 'code.html',
  styleUrls:['build/main.css'],
  providers:[codeService]
})
export class CodePage {
  codeObj:any=[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public codeService:codeService,
              public toastComponent:toastComponent) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodePage');
    this.getCode();
  }
  codeCreate():void{
    this.codeService.codeCreat().subscribe(data=>{
      if(data['code']==="E00000"){
        this.toastComponent.set('message',data['message']);
        this.toastComponent.popTotas();
        return; 
    }
      this.codeObj=data['data'];
      console.log(this.codeObj);
    },err=>{

    })
  }

  getCode():void{
    this.codeService.getcode().subscribe(data=>{
      if(data['code']==="E00000"){
        this.toastComponent.set('message',data['message']);
        this.toastComponent.popTotas();
        return; 
    }
      this.codeObj=data['data'];
      console.log(this.codeObj);
    },err=>{

    })
  }
}
