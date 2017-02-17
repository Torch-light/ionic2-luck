import { Injectable,Component } from '@angular/core';
import {toastComponent} from '../compoent/totas-component/totas-component';
import { Observable } from 'rxjs/Observable';
@Injectable()

export class Utils {
	point=0;
	constructor(public totas:toastComponent){

	}
	re(value){
		return Observable.create((Observable)=>{
		Observable.next(value);
	})
	}
	getPoint(){
      return this.point;
    }
    setPoint(value){
      this.point=value;
    }
	setLocalStorage (name,value){
		window.localStorage.setItem(name,JSON.stringify(value));
	}
	getLocalStorage(name){
		let obj:Object;
		let _obj=window.localStorage.getItem(name);
		obj=JSON.parse(_obj);
		return obj?obj:null;

	}

	clearAllLocalStorage(){
		window.localStorage.clear();
	}

	clearLocalStorage(name){
		window.localStorage.removeItem(name);
	}

	isLogin():any{
		let userInfo=this.getLocalStorage('userInfo');
		return userInfo?userInfo:null;
	}

	popErrorMessage(data){
		 this.totas.set('cssClass','errorTotas');
          this.totas.set('message',data,true);
	}

	popSuccessMessage(data){
		 this.totas.set('cssClass','successTotas');
          this.totas.set('message',data,true);
	}
}