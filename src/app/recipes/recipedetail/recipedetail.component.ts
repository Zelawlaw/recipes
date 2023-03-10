import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipedetail',
  templateUrl: './recipedetail.component.html',
  styleUrls: ['./recipedetail.component.css'],
})
export class RecipedetailComponent implements OnInit {
  recipes!: Recipe[];
  selectedRecipe!: Recipe;
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //  this.selectedRecipe  =  this.recipeService.selectedRecipe;
    //   this.recipeService.emitSelectionDone.subscribe(
    //     (clickedrecipe : {isselected:boolean,recipefocus: Recipe})=>{
    //       console.log('subscribed?');
    //       this.selectedRecipe = clickedrecipe.recipefocus;}
    //   );
    this.recipes= [];
    this.route.params.subscribe((data: Params) => {
      this.id = +data['id'];

      if (this.recipes.length !== 0)
        this.selectedRecipe = this.recipes[this.id];
    });

    this.route.data.subscribe((data: Data) => {
      this.recipes = data['recipes'];
      this.selectedRecipe = this.recipes[this.id];
    });
  }

  addToShoppingList() {
    this.recipeService.addToShoppingList(this.selectedRecipe.ingredients);
  }
  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    //navigate away
    // this.router.navigate(['../'],{relativeTo:this.route});
  }
}
