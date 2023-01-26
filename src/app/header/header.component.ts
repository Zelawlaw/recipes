import { Component, Output ,EventEmitter,OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  activeTab: String = 'recipes'
@Output('actTab') emitActiveTab  = new EventEmitter<String>();

constructor(private dsService: DataStorageService){}


ngOnInit(){


}



onSaveData(){
this.dsService.storeRecipes();

}

}
