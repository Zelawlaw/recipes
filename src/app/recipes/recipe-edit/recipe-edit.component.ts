import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
 editMode = false;
 id !:number;
 recipe !: Recipe;
 recipeForm!: FormGroup ;

  constructor(private route:ActivatedRoute,
    private recipeService:RecipeService,
    private formBuilder: FormBuilder){}


  ngOnInit(): void {
  
   this.route.params.subscribe(
    (params : Params)=>{
     if(params['id'] != null){
      this.id=+params['id'];
      this.editMode = params['id'] != null;
    //  this.initForm(); 
    }
    }
   ); 

   this.route.data.subscribe(
    (data :Data)=>{
      console.log('resolved??' +JSON.stringify(data));
      this.recipe = data['recipe'];
      this.editMode= data['recipe'] != null;
      console.log('editmode :'+this.editMode);
        this.initForm();
    }
   );
  
  }

  private initForm(){
   let recipeName='';
   let recipeImagePath='';
   let recipeDescription = '';
   let recipearray !: FormGroup [];
  
   if(this.editMode){
    recipeName = this.recipe.name;
    recipeImagePath = this.recipe.imagePath;
    recipeDescription = this.recipe.description;

   }
   
  //  this.recipeForm = new FormGroup({
  //   'name': new FormControl(recipeName),
  //   'imagePath': new FormControl(recipeImagePath),
  //   'description': new FormControl(recipeDescription)
  //  });

  this.recipeForm = this.formBuilder.group({
   name:[recipeName],
   imagePath:[recipeImagePath],
   description:[recipeImagePath],
   ingredients: this.formBuilder.array([])
  });

  if(this.editMode){
     //add ingredients
  for(let ing of this.recipe.ingredients){
    this.addIngredient(ing.name,ing.amount);
  }
  }
  
   console.log(this.recipeForm);
 

  }

  get Ingredients(){
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(name:string,amount:number){
   const ingredient = new FormGroup({
    name:new FormControl(name),
    amount:new FormControl(amount)
   });
   this.Ingredients.push(ingredient);
}

removeIngredient(index:number){
  this.Ingredients.removeAt(index);
  console.log('removed :'+index);
  console.log('remaining :'+this.Ingredients.value);
}

  onSubmitForm(){
   

  }
  
}
