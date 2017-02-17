import {Pipe, PipeTransform} from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'changeType'})
export class actionFilterPipe implements PipeTransform {
  transform(value:any) : string {
      if(value==1){
            return "小";
      }
      if(value==2){
            return "大";
      }
      if(value==3){
            return "单";
      }
      if(value=='双'){
            return "小";
      }
      if(value==13){
            return "13";
      }
      if(value==14){
            return "14";
      }
  }
}