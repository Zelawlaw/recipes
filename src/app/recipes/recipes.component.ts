import { Component } from '@angular/core';
import { Recipe } from './recipe.model'
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
focusRecipe:Recipe = new Recipe("a",'b','c');;
selectiondone = false;
  selectedRecipe(recipeselected:Recipe){
  this.focusRecipe=recipeselected;
   if(this.selectiondone == false) this.selectiondone=true;
   console.log("selectiondone :"+this.selectiondone+' selected :'+JSON.stringify(this.focusRecipe));
  }
  getSelectedRecipe(){
    console.log("returning :"+JSON.stringify(this.focusRecipe));
    return this.focusRecipe;
  }
}
