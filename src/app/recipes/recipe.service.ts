import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shoppinglist/shoppinglist.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
isselectiondone =  false;
selectedRecipe!:Recipe;
emitRecipes = new Subject<Recipe[]>()
//emitSelectionDone = new Subject<{isselected:boolean,recipefocus: Recipe}>();


constructor(private slService:ShoppingListService){}

// private recipes:Recipe[] =[
//   new Recipe('Loaded Chips',
//   'Recipe for loaded Chips',
//   'https://iambaker.net/wp-content/uploads/2018/04/cheese-fries.jpg',
//   [
//     new Ingredient('potatoes',5),
//     new Ingredient('cheese',7)
//   ]),
//   new Recipe('Pork Chops',
//   'Recipe for Pork Chops',
//   'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FSeries%2F2022-03_HT_Pan-fried-pork-chops%2F2022-02-22_ATK-4852',
//   [
//     new Ingredient('Pork',5),
//     new Ingredient('carrots',10)
//   ])
// ];

private recipes:Recipe[] =[];


//  clickedRecipe(selectedRecipe:Recipe){
//    console.log("clicked :"+JSON.stringify(selectedRecipe));
// this.selectedRecipe = selectedRecipe;
// this.isselectiondone = true;
// console.log("isselectiondone :"+this.isselectiondone);
// this.emitSelectionDone.next({isselected:true,recipefocus:selectedRecipe});
// }

getRecipes(): Recipe[]{

  return this.recipes.slice();
}

addToShoppingList(ingredients: Ingredient[]){
  for(let i =0;i<ingredients.length;i++){
    console.log('before :'+ JSON.stringify(ingredients[i]));
   }
this.slService.addIngredients(ingredients);

}

getRecipe(id:number){

  return this.recipes[id];
}

isInRange(id:number){

  if(id<this.recipes.length && id >= 0)
  return true;
  else return false;
}

addRecipe(recipe: Recipe){
this.recipes.push(recipe);
this.emitRecipes.next(this.recipes);
}

updateRecipe(index:number, newRecipe:Recipe){

  this.recipes[index]=newRecipe;
  this.emitRecipes.next(this.recipes.slice());
}

deleteRecipe(index:number){
  this.recipes.splice(index,1);
  this.emitRecipes.next(this.recipes.slice())
}

setRecipes(dbrecipes : Recipe[]){
  //console.log(dbrecipes);
  this.recipes = dbrecipes;
  console.log(this.recipes);
  this.emitRecipes.next(this.recipes.slice());
}

}
