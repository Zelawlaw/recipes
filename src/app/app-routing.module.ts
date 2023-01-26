import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { PleaseSelectRecipeComponent } from "./recipes/please-select-recipe/please-select-recipe.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipes/recipe-resolver.service";
import { RecipedetailComponent } from "./recipes/recipedetail/recipedetail.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppinglistComponent } from "./shoppinglist/shoppinglist.component";


const appRoutes :Routes = [
{path:'recipes',component:RecipesComponent , children:[
  {path:'new', component: RecipeEditComponent},
  {path :'', component:PleaseSelectRecipeComponent , pathMatch:'full',resolve:[RecipesResolverService]},
  {path:':id/edit',component:RecipeEditComponent,resolve: {recipes:RecipesResolverService}},
  {path:':id', component: RecipedetailComponent , resolve: {recipes:RecipesResolverService}}
]},
{path:'shopping-list', component:ShoppinglistComponent},
{path:'', pathMatch:'full', redirectTo:'/recipes'},
{ path:'auth' ,component:AuthComponent},
{path:'**',redirectTo:'/recipes'}

];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule {}