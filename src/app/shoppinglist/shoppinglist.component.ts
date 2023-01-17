import { Component , OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shoppinglist.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit ,OnDestroy{
ingredients!: Ingredient[];
ingredientSubscription !:Subscription;

constructor (private shoppingListService: ShoppingListService) {
  
}

ngOnInit(){
this.ingredients = this.shoppingListService.ingredients;
this.ingredientSubscription = this.shoppingListService.emitIngredients.subscribe(
  (ingredients :Ingredient[])=>{ 
    console.log('ingredients :'+JSON.stringify(ingredients));
    this.ingredients = ingredients;}
);
}

ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
}
onEditItem(i : number){

  this.shoppingListService.startedEditing.next(i);
}

}
