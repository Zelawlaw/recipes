import { Component,EventEmitter,Input,OnInit,Output } from '@angular/core';
import {Recipe} from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
@Component({
  selector: 'app-recipeitem',
  templateUrl: './recipeitem.component.html',
  styleUrls: ['./recipeitem.component.css']
})
export class RecipeitemComponent  {

 @Input() recipe !:Recipe;
 @Input() index!: number;
//@Output() recipeSelectedL1 = new EventEmitter<void>();

constructor(private recipeService:RecipeService){}

// onSelected(){
//  // console.log("emited to L1");
//  // this.recipeSelectedL1.emit();
//  this.recipeService.clickedRecipe(this.recipe);
// }



}
