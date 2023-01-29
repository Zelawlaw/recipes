import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { map ,tap ,take, exhaustMap} from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { RecipesComponent } from "../recipes/recipes.component";

@Injectable({
  providedIn:'root'
})
export class DataStorageService implements OnInit{



constructor(private authService:AuthService, private http : HttpClient ,private recipeService:RecipeService ){}

ngOnInit(): void {
    
}

storeRecipes(){
 const recipes = this.recipeService.getRecipes();

 this.http.put('https://ng-course-repice-book-2849b-default-rtdb.firebaseio.com/recipes.json',
  recipes
  ).subscribe(
    response =>{console.log(response)}
   );


//  this.http.put('https://ng-course-repice-book-2849b-default-rtdb.firebaseio.com/recipes.json',
//  recipes
//  ).subscribe(
//   response =>{console.log(response)}
//  )
}


 fetchRecipes() {
  
return this.http.get<Recipe[]>('https://ng-course-repice-book-2849b-default-rtdb.firebaseio.com/recipes.json'
).pipe(map( recipes =>{ 
  return recipes.map(arecipe =>{

    return {...arecipe,ingredients: arecipe.ingredients ? arecipe.ingredients: []}
  })
  }
  ),
  tap(recipes =>{
   this.recipeService.setRecipes(recipes);
  }))


         

 }
}