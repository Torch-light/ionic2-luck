import {Injectable,Component} from "@angular/core";
import {Observable, Observer} from "rxjs/Rx";
// import io from 'socket.io-client';
@Injectable()
export class broadcastService {

    engineStatus:Observable<boolean>;
    private  observer:Observer<boolean>;
    constructor(){
        this.engineStatus= new Observable<boolean>(observer=>this.observer=observer).share();
    }

    changeEngineStatus(newstatus:boolean){
      console.log(newstatus);
        if(this.observer!==undefined)
            this.observer.next(newstatus);
    }
  
  
}


// import {Injectable,Component} from "@angular/core";
// import {Http,Headers,RequestOptions} from "@angular/http";

// @Injectable()
// export class socketService{
    
//     constructor(){}
  
// }
