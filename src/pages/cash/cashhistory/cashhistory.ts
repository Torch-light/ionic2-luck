import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Cashhistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cashhistory',
  templateUrl: 'cashhistory.html'
})
export class CashhistoryPage {
	id:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.id=this.navParams.get('id');
  	console.log(this.id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CashhistoryPage');
  }

}
