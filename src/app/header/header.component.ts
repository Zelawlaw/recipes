import { Component, Output ,EventEmitter,OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  activeTab: String = 'recipes'
@Output('actTab') emitActiveTab  = new EventEmitter<String>();

ngOnInit(){

  console.log('header Init emit activeTab');
  this.emitActiveTab.emit(this.activeTab);

}

onSelect(feature:string){
 console.log('clicked recipes');
  if(feature=='recipes'){
    this.activeTab = 'recipes';
   }

   else{
    this.activeTab='shoppinglist';}
  this.emitActiveTab.emit(this.activeTab);
}



}
