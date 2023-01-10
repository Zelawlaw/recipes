import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";


@Injectable()
export class RecipeResolver implements Resolve<Recipe> {
  resolvedRecipe !: Recipe;
   constructor(private router:Router, private recipeService:RecipeService,
    private route:ActivatedRoute){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
  console.log('...resolving : id :'+route.params['id']);
   if(!isNaN(+route.params['id'])  && this.recipeService.isInRange(+route.params['id']) ){
    this.resolvedRecipe = this.recipeService.getRecipe(+route.params['id']);
    console.log(JSON.stringify(this.resolvedRecipe));
   }
   else {
    console.log('route away');
    this.router.navigate([''],{relativeTo: this.route});
   } 
   return this.resolvedRecipe;
  }
}