import { Component, ViewChild ,ElementRef ,SimpleChanges, OnChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shoppinglist/shoppinglist.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnChanges {


@ViewChild('nameInput') inputName!:ElementRef;
@ViewChild('amountInput') inputAmount!:ElementRef;

constructor(private shoppingListService:ShoppingListService){}

ngOnChanges(changes: SimpleChanges) {
  console.log('changes :'+changes)
}

processItem(action:string):void{
   console.log('inputName :'+this.inputName.nativeElement.value);
   console.log('inputAmount :'+this.inputAmount.nativeElement);
  if(!this.inputName.nativeElement.value){
    alert('Kindly input an Ingredient name');
  }
  else if (!this.inputAmount.nativeElement.value){
    alert('Kindly input an Amount');
  }
  else{
   
  this.shoppingListService.processProps([action, 
    new Ingredient(this.inputName.nativeElement.value,
      this.inputAmount.nativeElement.value)]);

  }
}



}
