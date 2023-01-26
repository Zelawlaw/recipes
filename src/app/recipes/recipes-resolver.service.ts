import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn:'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

   constructor(private dbService : DataStorageService, private recipeService : RecipeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    
    return (this.recipeService.getRecipes().length ==0) ? this.dbService.fetchRecipes() :this.recipeService.getRecipes();
}



}