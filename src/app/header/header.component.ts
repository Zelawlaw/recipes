import { Component, Output ,EventEmitter,OnInit} from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  activeTab: String = 'recipes'
@Output('actTab') emitActiveTab  = new EventEmitter<String>();

constructor(private dsService: DataStorageService,private recipeService : RecipeService){}


ngOnInit(){


}

onSaveData(){
this.dsService.storeRecipes();

}

onFetchData(){
  this.dsService.fetchRecipes().subscribe();
}

}
