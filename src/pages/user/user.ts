import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import {RechargehistoryPage} from '../recharge/rechargehistory/rechargehistory';
import {CashhistoryPage} from '../cash/cashhistory/cashhistory';
import  {ActionhistoryPage} from '../history/actionhistory/actionhistory';
import {managerService} from '../usermanager/manager.service';
import {toastComponent} from '../../compoent/totas-component/totas-component';
import { Utils }    from '../../helps/utils';

// import {RechargehistoryPage} from '../recharge/rechangehistory/rechangehistory';

/*
  Generated class for the User page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
	providers:[managerService]
})
export class UserPage {
	user:Object;
	img:string='./img/v.jpg';
	model={
		point:null
	};
	color:String;
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public appCtrl:App,
					public managerService:managerService,
					public toastComponent:toastComponent,
					public Utils:Utils) {
	this.user=this.navParams.get('user');

					}

  ionViewDidLoad() {
		 
    console.log(this.user);
  }
  History(type:number){
  	switch (type) {
  		case 1:
  			this.appCtrl.getRootNav().push(RechargehistoryPage,{id:0});
  			// code...
  			break;
  		case 2:
  			this.appCtrl.getRootNav().push(CashhistoryPage,{id:0});
  			// code...
  			break;
  		case 3:
  		this.appCtrl.getRootNav().push(ActionhistoryPage,{id:0});
  			// code...
  			break;
  		
  		default:
  		//none
  			// code...
  			break;
  	}
  }

	changePoint(){
		let model={
			point:this.model['point'],
			uid:this.user['id']
		}
		this.managerService.changePoinit(model).subscribe(data=>{
				if(data['code']==="E00000"){
					this.Utils.popErrorMessage(data['message'])
				}else{
					this.color='danger';
					this.user['points']=data['data'];
				}
		},err=>{
			console.log(err);
		})
	}
}
