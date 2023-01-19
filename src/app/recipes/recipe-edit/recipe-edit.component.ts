import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit , OnDestroy {
  editMode = false;
  id!: number;
  recipe!: Recipe;
  recipeForm!: FormGroup;
  lastIndex !:number;
  recipeSubscription !:Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] != null) {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        //  this.initForm();
      }
    });

    this.route.data.subscribe((data: Data) => {
      console.log('resolved??' + JSON.stringify(data));
      this.recipe = data['recipe'];
      this.editMode = data['recipe'] != null;
      console.log('editmode :' + this.editMode);
      this.initForm();
    });
   
   this.recipeSubscription = this.recipeService.emitRecipes.subscribe(
     (data :Recipe [])=>{
      this.lastIndex = data.length-1;
     }

    );

  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipearray!: FormGroup[];

    if (this.editMode) {
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
      name: [recipeName,[Validators.required]],
      imagePath: [recipeImagePath,[Validators.required]],
      description: [recipeDescription,[Validators.required]],
      ingredients: this.formBuilder.array([]),
    });

    if (this.editMode) {
      //add ingredients
      for (let ing of this.recipe.ingredients) {
        this.addIngredient(ing.name, ing.amount);
      }
    }

    console.log(this.recipeForm);
  }

  get Ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(name: string, amount: number) {

   const amountFC = new FormControl((name.length ==0) ? null :amount,[
                            Validators.required,
                            Validators.pattern(/^[1-9]+[0-9]*$/)
                           ]);
    const ingredient = new FormGroup({
      name: new FormControl(name,Validators.required),
      amount: amountFC,
    });
    this.Ingredients.push(ingredient);
  }

  removeIngredient(index: number) {
    this.Ingredients.removeAt(index);
    console.log('removed :' + index);
    console.log('remaining :' + this.Ingredients.value);
  }

onAddIngredient(){
  this.addIngredient('',Number());  
  }

  onSubmitForm() {
   const newRecipe = new Recipe(
     this.recipeForm.value['name'],
     this.recipeForm.value['description'],
     this.recipeForm.value['imagePath'],
     this.recipeForm.value['ingredients']
   );

  console.log(JSON.stringify(newRecipe));

  if(this.editMode){
    //can use this instead of newRecipe coz structure is the same including name
    // this.recipeService.updateRecipe(this.id,newRecipe);
    this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  else
  {
    this.recipeService.addRecipe(this.recipeForm.value);
    this.router.navigate(['../',this.lastIndex],{relativeTo:this.route});
  }

  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

   onDeleteIngredient(index :number){
    this.removeIngredient(index);
   }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();  
  }

 
}
