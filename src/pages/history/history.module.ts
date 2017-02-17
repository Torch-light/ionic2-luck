import { NgModule} from '@angular/core';
import { IonicModule} from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { ActionhistoryPage } from './actionhistory/actionhistory';
import {HistoryPage} from './history'

import { toastComponent } from '../../compoent/totas-component/totas-component';
import {Utils} from '../../helps/utils';
import { historyService } from './history.service';
// import { apiService } from '../../service/api.service';

@NgModule({
  declarations: [
  ActionhistoryPage,
  // HistoryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  entryComponents: [
  ActionhistoryPage,
  // HistoryPage
  ],
  exports:[IonicModule],
  providers: [toastComponent,Utils]
})
export class HistoryModule {

}
