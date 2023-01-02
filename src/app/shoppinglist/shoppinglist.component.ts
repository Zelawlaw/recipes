import { Component , OnInit } from '@angular/core';
import { ShoppingListService } from '../services/shoppinglist.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css'],
  providers:[ShoppingListService]
})
export class ShoppinglistComponent implements OnInit {
ingredients!: Ingredient[];

constructor (private shoppingListService: ShoppingListService) {
  
}

ngOnInit(){
this.ingredients = this.shoppingListService.ingredients;
this.shoppingListService.emitIngredients.subscribe(
  (ingredients :Ingredient[])=>{ 
    console.log('ingredients :'+ingredients);
    this.ingredients = ingredients;}
);
}

}
