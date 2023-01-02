import { Recipe } from "../recipes/recipe.model";


export class RecipeService{
isselectiondone =  false;
selectedRecipe!:Recipe;

recipes:Recipe[] =[
  new Recipe('A Test Recipe 1',
  'This is simply a test',
  'https://media.istockphoto.com/id/1226733438/photo/salad-with-grilled-chicken-breast-avocado-pomegranate-seeds-and-tomato-on-white-background.jpg?s=612x612&w=is&k=20&c=21Y-M0kyBprp-cs640YtgPBq_NmEo9gHTwztl690HRs='),
  new Recipe('A Test Recipe 2',
  'This is simply a test',
  'https://www.eatthis.com/wp-content/uploads/sites/4/2021/12/birria-tacos-1.jpg?quality=82&strip=1&w=1250'),
  new Recipe('A Test Recipe 3',
  'This is simply a test',
  'https://media.istockphoto.com/id/1295633127/photo/grilled-chicken-meat-and-fresh-vegetable-salad-of-tomato-avocado-lettuce-and-spinach-healthy.jpg?s=612x612&w=0&k=20&c=Qa3tiqUCO4VpVMQDXLXG47znCmHr_ZIdoynViJ8kW0E=')
];


 clickedRecipe(selectedRecipe:Recipe){
   console.log("clicked :"+JSON.stringify(selectedRecipe));
this.selectedRecipe = selectedRecipe;
this.isselectiondone = true;
console.log("isselectiondone :"+this.isselectiondone);
}

}
