import {Injectable} from "@angular/core";
import {Http,Response} from "@angular/http";
// import {Observable} from "rxjs/Observable";
import {Config} from "../../helps/config";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import {apiService} from "../../service/api.service";
@Injectable()
export class historyService{

    config=Config;
    constructor(public http:Http,
                public apiService:apiService){


    }

    getHistory():Observable<any>{
        let url=this.config.url+this.config.history;
       return  this.apiService.call('get',url,{},false)
                 .map(this.extracaData)
                 .catch(this.handleError);        
    }
    getActionHistory(obj):Observable<any>{ 
        let url=this.config.url+this.config.actionhistory;
       return  this.apiService.call('get',url,obj,true)
                 .map(this.extracaData)
                 .catch(this.handleError);
    }
    private handleError(error:Response|any){
         let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
    
    private extracaData(res:Response){
        let body=res.json();
        console.log(body);
        return body;

    }
}