import { Component,ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ActionPage } from '../action/action';
import { SeetingPage } from '../seeting/seeting';
import { HistoryPage } from '../history/history';
import { Utils } from '../../helps/utils';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  HomePage: any = HomePage;
  ActionPage: any = ActionPage;
  SeetingPage: any = SeetingPage;
  HistoryPage: any = HistoryPage;

  constructor(public utils:Utils) {

  }
  chat():void{
    
  }

  
 // ionViewDidLoad(){
 //   setTimeout(()=>{

 //   this.utils.popSuccessMessage('12312');
 //   },2000)
 // }

}
