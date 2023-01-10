import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model'
import { ShoppingListService } from '../shoppinglist/shoppinglist.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[]
})
export class RecipesComponent implements OnInit {
focusRecipe !:Recipe ;
selectiondone!:boolean;

constructor(private recipeService:RecipeService){}

ngOnInit(): void {
 //this.selectiondone = this.recipeService.isselectiondone;
  
 this.recipeService.emitSelectionDone.subscribe(
  (clickedrecipe : {isselected:boolean,recipefocus: Recipe})=>{ this.selectiondone = clickedrecipe.isselected;
   this.focusRecipe= clickedrecipe.recipefocus;}
);

}

}
