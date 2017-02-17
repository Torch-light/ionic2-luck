import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import {HomeModule} from '../pages/home/home.module';
import {HistoryModule} from '../pages/history/history.module';
import {ActionModule} from '../pages/action/action.module';
import { Utils } from '../helps/utils';
import { apiService } from '../service/api.service';
import {socketService} from '../service/socket.service';
import {actionFilterPipe} from '../pipe/action.pipe'
@NgModule({
  declarations: [
    MyApp,
    TabsPage,
  ],
  imports: [
    HistoryModule,
    HomeModule,
    ActionModule,
    IonicModule.forRoot(MyApp,
    {backButtonText:'返回'},
    actionFilterPipe
    // {
      // links:[
      // {component:RegisterPage,name:'register',segment:'register'},
      // {component:TabsPage,name:'tabs',segment:'action'},
      // {component:ActionPage,name:'action',segment:'action'},
      // {component:SeetingPage,name:'seeting',segment:'seeting'},
      // {component:HistoryPage,name:'history',segment:'history'},
      // {component:HomePage,name:'',segment:'home'},
      // {component:RegisterPage,name:'register',segment:'register'}
    // ]}
    )    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},apiService,
  Utils,socketService]
})
export class AppModule {}
