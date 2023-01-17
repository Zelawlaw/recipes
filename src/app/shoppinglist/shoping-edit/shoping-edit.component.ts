import { Component, ViewChild ,ElementRef ,SimpleChanges, OnChanges, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from 'src/app/shoppinglist/shoppinglist.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnChanges,OnInit,OnDestroy {

@ViewChild('f') addForm !:NgForm;
subscription!:Subscription;
editMode=false;
editedItemIndex !:number;
editedItem !:Ingredient;

constructor(private shoppingListService:ShoppingListService){}

ngOnChanges(changes: SimpleChanges) {
  console.log('changes :'+changes)
}

ngOnInit(): void {
  this.subscription =  this.shoppingListService.
             startedEditing.subscribe(
              (index:number)=>{
                this.editMode=true;
                this.editedItemIndex = index;
                this.editedItem=this.shoppingListService.getIngredient(index);
               this.addForm.setValue(
                {
                name:this.editedItem.name,
                amount:this.editedItem.amount
               }
               );
              }
             );
}

submitItem(form:NgForm):void{

console.log(form);
console.log('inputName :'+form.value.name);
console.log('inputAmount :'+form.value.amount);
if(this.editMode){
  this.shoppingListService.updateIngredient(this.editedItemIndex,
    new Ingredient(this.addForm.value.name,
      this.addForm.value.amount));
}
else{
this.shoppingListService.processProps(['add', 
  new Ingredient(form.value.name,
    form.value.amount)]);
  }
//reset form
this.addForm.reset();
this.editMode=false;
}

onClear(){
  this.editMode=false;
  this.addForm.reset();
}
onDelete(){
if(this.editMode == false){
  alert("Please select Ingredient!");
}else{
this.shoppingListService.deleteIngredient(this.editedItemIndex);
this.onClear();
}

}



ngOnDestroy(): void {
   this.subscription.unsubscribe(); 
}

}
