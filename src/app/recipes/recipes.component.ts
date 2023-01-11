import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model'
import { ShoppingListService } from '../shoppinglist/shoppinglist.service';
import { Subscription } from 'rxjs';
import { TitleStrategy } from '@angular/router';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[]
})
export class RecipesComponent {

}
