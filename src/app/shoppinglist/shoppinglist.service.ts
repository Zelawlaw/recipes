import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";


export class ShoppingListService {

  emitIngredients = new EventEmitter<Ingredient[]>();

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
   this.emitIngredients.emit(this.getIngredients());
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredients(ingredients:Ingredient[]){
 
   //this.ingredients =  this.ingredients.concat(ingredients);
   this.ingredients.push(...ingredients);
 
    this.emitIngredients.emit(this.getIngredients().slice());
  }
   
   
}