import {Injectable} from "@angular/core";
import {Http,Response} from "@angular/http";
// import {Observable} from "rxjs/Observable";
import {Config} from "../../helps/config";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import {apiService} from "../../service/api.service";

@Injectable()
export class actionService{
    dateType:Number;
    actionArray:Array<Object>=[]
    config=Config;
    constructor(public http:Http,
                public apiService:apiService){


    }
    action(obj):Observable<any>{
       let url=this.config.url+this.config.action;
       return  this.apiService.call('post',url,obj,true)
                 .map(this.extracaData)
                 .catch(this.handleError);
    }
    getReview():Observable<any>{
        let url=this.config.url+this.config.review;
       return  this.apiService.call('get',url,{},true)
                 .map(this.extracaData)
                 .catch(this.handleError);        
    }
    stystem():Observable<any>{
         let url=this.config.url+this.config.stystem;
       return  this.apiService.call('get',url,{},true)
                 .map(this.extracaData)
                 .catch(this.handleError); 
    }
    delAction(obj):Observable<any>{
            let url=this.config.url+this.config.delaction;
       return  this.apiService.call('post',url,obj,true)
                 .map(this.extracaData)
                 .catch(this.handleError); 
    }
    getAction():Observable<any>{
          let url=this.config.url+this.config.getaction;
       return  this.apiService.call('get',url,{},true)
                 .map(this.extracaData)
                 .catch(this.handleError); 
    }
    filterDate(obj,i,actionModel,resule){
              resule.push({name:obj['value'],
                          type:obj['type'],
                          metux:obj['metux'],
                          n:i
                        });
          resule.forEach((n,index)=>{
         if(n['metux']==obj['type']){
            resule.splice(index,1);
            actionModel[n['n']]['isSelect']=false;
         }
       })
       if(obj['type']<13){
         
          actionModel.forEach((n,index)=>{
                 if(n['type']>=13){
                   actionModel[index]['isSelect']=false;
                 }
               })    
       }else
          actionModel.forEach((n,index)=>{
                 if(n['type']<13){
                   actionModel[index]['isSelect']=false;
                 }
               })
       }  
    
    dateHandle(obj){
        if(this.dateType!=obj['actionType']){
          if(obj['actionType']>2){
          this.actionArray=[];  
          }
          this.actionArray.push({name:obj['value'],type:obj['type']});
          this.dateType=obj['actionType'];
          obj['isSelect']=true;
          return this.actionArray;
        }else{
          obj['isSelect']=false;
        }
          
        
        
    
      // if(this.dateType===obj['actionType']){
      //   return ;
      // }else{
      //   this.actionArray.push({name:obj['value'],type:obj['type']})
      //   this.dateType=obj['actionType'];
      // }
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