import { Component, Output ,EventEmitter, OnInit} from '@angular/core';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit  {

  recipes!:Recipe [];

constructor(private recipeService:RecipeService){}

ngOnInit(): void {
  this.recipes = this.recipeService.getRecipes();
}

selectedRecipe(selectedRecipe:Recipe){
//  console.log("emited to L2");
//this.selectedRecipeL2.emit(selectedRecipe);
console.log('clicked Item?');
 this.recipeService.clickedRecipe(selectedRecipe);
}


}
