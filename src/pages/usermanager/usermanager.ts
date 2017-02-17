import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import {UserPage} from '../user/user';
import {managerService} from './manager.service';
import {toastComponent} from '../../compoent/totas-component/totas-component'

/*
  Generated class for the Usermanager page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-usermanager',
  templateUrl: 'usermanager.html',
  providers:[managerService]
})
export class UsermanagerPage implements OnInit{
	userInfo:Array<Object>=[];
	_userInfo:Array<Object>=[];
	img:string='./img/v.jpg';
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public appCtrl:App,
			  public managerService:managerService,
			  public totas:toastComponent) {}
  ngOnInit (){
    console.log(123);
	  this.getUser();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UsermanagerPage');
    console.log(this.navParams.get('obj'));
  }
  search(ev:Event){
  	let searchString=ev.target['value'];
  	if(searchString&&searchString.trim()!=""){
		this.userInfo=this.userInfo.filter(value=>{
  			let bol=value['name'].toLowerCase().indexOf(searchString.toLowerCase())>-1;
  			return bol;
  		})

  	}else{
  		this.userInfo=this._userInfo;
  }
}
  goUser(user:Object){
  	this.appCtrl.getRootNav().push(UserPage,{user:user});
  }

  getUser(){
	  	this.managerService.getUser({}).subscribe(data=>{
			  	if(data['code']==="E00000"){
					 this.totas.set('message',data['message']);
            this.totas.set('cssClass','errorTotas');
            this.totas.popTotas();
				}else{
					this.userInfo=data['data'];
					this._userInfo=data['data'];
				}
		  },err=>{
			  console.log(err);
		  })
  }
}
