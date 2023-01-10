import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipedetail',
  templateUrl: './recipedetail.component.html',
  styleUrls: ['./recipedetail.component.css']
})
export class RecipedetailComponent implements OnInit {
selectedRecipe!:Recipe;

constructor(private recipeService:RecipeService , private route:ActivatedRoute){}

ngOnInit(): void {
//  this.selectedRecipe  =  this.recipeService.selectedRecipe;
//   this.recipeService.emitSelectionDone.subscribe(
//     (clickedrecipe : {isselected:boolean,recipefocus: Recipe})=>{ 
//       console.log('subscribed?');
//       this.selectedRecipe = clickedrecipe.recipefocus;}
//   );

this.route.data.subscribe(
  (data :Data)=>{
    this.selectedRecipe = data['recipe'];
   
  }
);

}

addToShoppingList(){
  this.recipeService.addToShoppingList(this.selectedRecipe.ingredients);
}


}
