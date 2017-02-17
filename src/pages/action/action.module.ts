import { NgModule} from '@angular/core';
import { IonicModule} from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { toastComponent } from '../../compoent/totas-component/totas-component';
import {Utils} from '../../helps/utils';
import { actionService } from './history.service';
import {actionFilterPipe} from '../../pipe/action.pipe'
// import { apiService } from '../../service/api.service';

@NgModule({
  declarations: [
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  entryComponents: [
    
  ],
  exports:[IonicModule],
  providers: [toastComponent,Utils]
})
export class ActionModule {

}
