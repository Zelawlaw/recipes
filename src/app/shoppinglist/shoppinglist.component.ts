import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent {

  ingredients:Ingredient[]=[
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10)
  ];




  processProps(props:any[]){

  switch(props[0]){
   case 'add':
    this.ingredients.push(props[1]);
   break;
   case 'delete':
    this.ingredients.pop();
   break;

   case 'clear':
     this.ingredients =[];
   break;

   default:
    console.log("option not processed");
   break;



  }


  }
}
