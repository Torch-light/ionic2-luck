import {Injectable} from "@angular/core";
import {Http,Response} from "@angular/http";
// import {Observable} from "rxjs/Observable";
import {Config} from "../../helps/config";
import {apiService} from "../../service/api.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user.model';
@Injectable()
export class reviewService{

    config=Config;
    constructor(public http:Http,
                public apiService:apiService){


    }


    history():Observable<User>{
        let url=this.config.url+this.config.getregister;
       return  this.apiService.call('get',url,{},true)
                 .map(this.extracaData)
                 .catch(this.handleError);        
    }

    updateRecharge(obj):Observable<User>{
        let url=this.config.url+this.config.updatarecharge;
       return  this.apiService.call('post',url,obj,true)
                 .map(this.extracaData)
                 .catch(this.handleError);
    }

    updateCash(obj):Observable<User>{
        let url=this.config.url+this.config.updatacash;
       return  this.apiService.call('post',url,obj,true)
                 .map(this.extracaData)
                 .catch(this.handleError);
    }


    getCash(obj):Observable<any>{
         let url=this.config.url+this.config.getcash;
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