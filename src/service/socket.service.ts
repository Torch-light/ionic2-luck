import {Injectable,Component} from "@angular/core";
import * as io from "socket.io-client";
import {Config} from "../helps/config"
import {Utils} from "../helps/utils"
// import io from 'socket.io-client';
@Injectable()
export class socketService {
  socket: SocketIOClient.Socket;
  rechargeFlag:boolean=false;
  cashFlag:boolean=false;
  resultFlag:boolean=false;
  constructor(public utils:Utils){
       this.socket = io(Config.base);   
  }
  userRecharge(id){
    if(!this.rechargeFlag){
      this.socket.on('recharge-'+id, (data) => {
            this.utils.popSuccessMessage(data['message']['message']);
        });
        this.rechargeFlag=true;
    }
          
  }
  userCash(id){
    if(!this.cashFlag){
      console.log("cash"+id);
        this.socket.on('cash-'+id, (data) => {
         console.log(data);
            this.utils.popSuccessMessage(data['message']['message']);
        }); 
      this.cashFlag=true;
    }
    
  }
  adminCash(id){

  }
  adminRecharge(id){

  }
  system(){
      this.socket.on('system', (data) => {
        console.log(data);
      });
  }

  result(callback){
    if(!this.resultFlag){
      this.socket.on('result', (data) => {
        callback(data);
      });
      this.resultFlag=true;
    }
     
  }

  remove(value){
    this.socket.removeListener(value);
  }
  removeAll(){
    this.socket.removeAllListeners(); 
  }
  
}


// import {Injectable,Component} from "@angular/core";
// import {Http,Headers,RequestOptions} from "@angular/http";

// @Injectable()
// export class socketService{
    
//     constructor(){}
  
// }
