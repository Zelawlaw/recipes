import { Component, Output ,EventEmitter} from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent  {
recipes:Recipe[] =[
  new Recipe('A Test Recipe 1',
  'This is simply a test',
  'https://www.eatthis.com/wp-content/uploads/sites/4/2021/12/birria-tacos-1.jpg?quality=82&strip=1&w=1250'),
  new Recipe('A Test Recipe 2',
  'This is simply a test',
  'https://www.eatthis.com/wp-content/uploads/sites/4/2021/12/birria-tacos-1.jpg?quality=82&strip=1&w=1250'),
  new Recipe('A Test Recipe 3',
  'This is simply a test',
  'https://www.eatthis.com/wp-content/uploads/sites/4/2021/12/birria-tacos-1.jpg?quality=82&strip=1&w=1250')
];

@Output() selectedRecipeL2 = new EventEmitter<Recipe>();




selectedRecipe(selectedRecipe:Recipe){
  console.log("emited to L2");
this.selectedRecipeL2.emit(selectedRecipe);
}


returnRecipes():Recipe[]{
  return this.recipes;
}

}
