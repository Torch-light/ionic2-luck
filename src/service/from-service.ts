// import  {Injectable} from '@angular/core';
// import {Subject} from 'rxjs/Subject';
// export class fromService{

//   private childService = new Subject<string>();
//   private parentService = new Subject<string>();

//    childSerivce$ = this.childService.asObservable();
//   parentSerivce$ = this.parentService.asObservable();
// model:{};

//  announceMission(childModel: string) {
//     this.childService.next(childModel);
//   }
//   confirmMission(parentModel: string) {
//     this.parentService.next(parentModel);
//   }
// get getItem(){
// 	return this.model;
// }
// set setItem(item){
// 	for(let o in item){
//   		this.model[item]=o;
//   	}
// }
// }