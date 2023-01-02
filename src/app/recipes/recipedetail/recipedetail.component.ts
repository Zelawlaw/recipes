import { Component,Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipedetail',
  templateUrl: './recipedetail.component.html',
  styleUrls: ['./recipedetail.component.css']
})
export class RecipedetailComponent implements OnInit {
selectedRecipe!:Recipe;

constructor(private recipeService:RecipeService){}

ngOnInit(): void {
  this.selectedRecipe  =  this.recipeService.selectedRecipe;
}


}
