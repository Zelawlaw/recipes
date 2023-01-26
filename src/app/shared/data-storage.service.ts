import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { map ,tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { RecipesComponent } from "../recipes/recipes.component";

@Injectable({
  providedIn:'root'
})
export class DataStorageService implements OnInit{

constructor(private http : HttpClient ,private recipeService:RecipeService ){}

ngOnInit(): void {
    
}

storeRecipes(){
 const recipes = this.recipeService.getRecipes();
 this.http.put('https://ng-course-repice-book-2849b-default-rtdb.firebaseio.com/recipes.json',
 recipes
 ).subscribe(
  response =>{console.log(response)}
 )
}


 fetchRecipes() {
  
 return this.http.get<Recipe[]>('https://ng-course-repice-book-2849b-default-rtdb.firebaseio.com/recipes.json')
          .pipe(map( recipes =>{ 
           return recipes.map(arecipe =>{

             return {...arecipe,ingredients: arecipe.ingredients ? arecipe.ingredients: []}
           })
           }
           ),
           tap(recipes =>{
            this.recipeService.setRecipes(recipes);
           })
           )
         

 }
}