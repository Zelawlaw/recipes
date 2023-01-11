import { Component, Output ,EventEmitter, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit  {

  recipes!:Recipe [];

constructor(private recipeService:RecipeService,
  private router:Router,private route:ActivatedRoute){}

ngOnInit(): void {
  this.recipes = this.recipeService.getRecipes();
}

// selectedRecipe(selectedRecipe:Recipe){
// //  console.log("emited to L2");
// //this.selectedRecipeL2.emit(selectedRecipe);
// console.log('clicked Item?');
//  this.recipeService.clickedRecipe(selectedRecipe);
// }

createRecipe(){
this.router.navigate(['new'],{relativeTo:this.route});

}
}
