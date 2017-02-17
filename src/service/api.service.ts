import {Injectable} from "@angular/core";
import {Http,Headers,RequestOptions} from "@angular/http";
import {Utils} from "../helps/utils"

@Injectable()
export class apiService{
    objs=Object;
    constructor(public http:Http,
                public utils:Utils){}
    call(method:string,url:string,obj:Object,isNeedToken?:boolean):any{
        let _method=method.toUpperCase();
        let _resulte;
        if(isNeedToken){
               let userInfo=this.utils.isLogin();
             let authHeader = new Headers({ 'Authorization': 'Bearer ' + userInfo['Token'] });
  var options = new RequestOptions({ headers: authHeader });
        }
        switch(_method){
            case 'GET':
            
            let _url=this.joint(url,obj);
            _resulte=this.http.get(_url,options)
            break;
            case 'POST':
            console.log(obj);
            _resulte=this.http.post(url,obj,options);
            break;
            case 'DELETE':
            break;
            case 'JSOP':
            break;
            case 'PUT':
            break;
        }
        console.log(_resulte)
        return _resulte;
    }
    joint(url:string,obj:Object):string{
        let arr=[];
        let _i=0;
        var _url=url;
        for (var i in obj){
            if(_i===0){
                _url=url+'?';
            }
            arr.push(i+'='+obj[i]);
            ++_i;
        }
        if(_i>0){
        _url+=(arr.join('&'));
        }
        return _url;
    }
    // httpCalzl(url:string):Object{
    //     let obj=this.http.get(url);
    //     return obj;
    // }
}