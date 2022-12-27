import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

activeTab :String='';

processActiveView(activetab:String){
  console.log('processing emitted event. activeTab:'+activetab);
  this.activeTab=activetab;
}

}
