import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";


export class ShoppingListService {

  emitIngredients = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
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
   this.emitIngredients.next(this.getIngredients().slice());
  }

  getIngredients(){
    return this.ingredients.slice();
  }
getIngredient(index: number){
  return this.ingredients[index];
}


  addIngredients(ingredients:Ingredient[]){
 
   //this.ingredients =  this.ingredients.concat(ingredients);
   this.ingredients.push(...ingredients);
 
    this.emitIngredients.next(this.getIngredients().slice());
  }
   
  updateIngredient(index:number,newIngredient:Ingredient){
    this.ingredients[index]= newIngredient;
    this.emitIngredients.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.emitIngredients.next(this.ingredients.slice());
  }
   
}