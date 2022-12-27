import { Component,EventEmitter,Input,OnInit,Output } from '@angular/core';
import {Recipe} from '../../recipe.model';
@Component({
  selector: 'app-recipeitem',
  templateUrl: './recipeitem.component.html',
  styleUrls: ['./recipeitem.component.css']
})
export class RecipeitemComponent  {

@Input() recipe :Recipe =  new Recipe('bla',
'blabla',
'fish');

@Output() recipeSelectedL1 = new EventEmitter<void>();

onSelected(){
  console.log("emited to L1");
  this.recipeSelectedL1.emit();
}



}
