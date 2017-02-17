import { NgModule} from '@angular/core';
import { IonicModule} from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ActionPage } from '../action/action';
import { HistoryPage } from '../history/history';
import { RechargePage } from '../recharge/recharge';
import { CashPage } from '../cash/cash';
import { CodePage } from '../code/code';
import { UserPage } from '../user/user';
import { UsermanagerPage } from '../usermanager/usermanager';
import {RechargehistoryPage} from "../recharge/rechargehistory/rechargehistory";
import {CashhistoryPage} from "../cash/cashhistory/cashhistory";
import { reviewComponent } from '../../compoent/review-component/review';
import { toastComponent } from '../../compoent/totas-component/totas-component';
// import {Utils} from '../../helps/utils';
import { homeService } from './home.service';
import { ErrorhandlerPage } from '../errorhandler/errorhandler';
import {ErrormangerPage} from '../errorhandler/errormanger/errormanger';
// import { apiService } from '../../service/api.service';

@NgModule({
  declarations: [
    HomePage,
    ActionPage,
    CashPage,
    RechargePage,
    reviewComponent,
    CodePage,
    LoginPage,
    toastComponent,
    HistoryPage,
    UsermanagerPage,
    UserPage,
    RechargehistoryPage,
    CashhistoryPage,
    ErrorhandlerPage,
    ErrormangerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  entryComponents: [
    HomePage,
    ActionPage,
    LoginPage,
    CashPage,
    reviewComponent,
    CodePage,
    RechargePage,
    toastComponent,
    HistoryPage,
    UsermanagerPage,
    UserPage,
    RechargehistoryPage,
    CashhistoryPage,
    ErrorhandlerPage,
    ErrormangerPage
  ],
  exports:[IonicModule],
  providers: []
})
export class HomeModule {

}
