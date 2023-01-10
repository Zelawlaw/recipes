import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
 editMode = false;
 recipe !: Recipe;

  constructor(private route:ActivatedRoute){}


  ngOnInit(): void {
  
   this.route.params.subscribe(
    (params : Params)=>{
     if(params['id'] != null){
      this.editMode = true;
    }
    }
   ); 

   this.route.data.subscribe(
    (data :Data)=>{

      this.recipe = data['recipe'];
     
    }
   );
  
  }


  
}
