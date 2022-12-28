import { Component, ViewChild ,ElementRef ,SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnChanges {


@ViewChild('nameInput') inputName!:ElementRef;
@ViewChild('amountInput') inputAmount!:ElementRef;
@Output('ingrProps') emitProps = new EventEmitter<string []>();


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
    console.log("emitting emitProps()");
   this.emitProps.emit([action,this.inputName.nativeElement.value,this.inputAmount.nativeElement.value]);
  }
}



}
