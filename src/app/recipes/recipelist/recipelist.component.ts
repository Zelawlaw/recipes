import { Component, Output ,EventEmitter, OnInit} from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit  {

  recipes!:Recipe [];

@Output() selectedRecipeL2 = new EventEmitter<Recipe>();

constructor(private recipeService:RecipeService){}

ngOnInit(): void {
  this.recipes = this.recipeService.recipes;
}

selectedRecipe(selectedRecipe:Recipe){
//  console.log("emited to L2");
//this.selectedRecipeL2.emit(selectedRecipe);
console.log('clicked Item?');
 this.recipeService.clickedRecipe(selectedRecipe);
}


returnRecipes():Recipe[]{
  return this.recipeService.recipes;
}

}
