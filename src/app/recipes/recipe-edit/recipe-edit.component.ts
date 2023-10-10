import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  @ViewChild('editForm') editForm !: NgForm ;
  id !: number ;
  editMode = false ;
  ingredientsEditMode = false ;
  recipeIngredients !: Ingredient[] ;
  recipe !: Recipe ;
  recipeName ='' ;
  recipeImgUrl ='';
  recipeDescription ='';
  ingredientToEdit !: Ingredient ;
  ingredientName : string = '';
  ingredientAmount !: number;
  ingredientSelectedID !: number;



  constructor(
              private route : ActivatedRoute , 
              private recipeService : RecipeService,
              private router : Router,
              private dataStorageService : DataStorageService
              ){}



  ngOnInit(){
   this.route.params.subscribe(
    (params : Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null ;
    }
  )
  if(this.editMode){
    this.recipe = this.recipeService.getRecipe(this.id);
    this.recipeIngredients = this.recipe.ingredients;
    this.recipeName = this.recipe.name;
    this.recipeImgUrl = this.recipe.imagepath;
    this.recipeDescription = this.recipe.description;
  }
  else {
    this.recipeIngredients = [];
  }
}

onSubmit(myform : NgForm){
  const value = myform.value;
  this.recipeName = value.name;
  this.recipeImgUrl = value.imageurl;
  this.recipeDescription = value.description;
  const newRecipe = new Recipe(this.recipeName , this.recipeDescription , this.recipeImgUrl , this.recipeIngredients);

  if(this.editMode){
    this.recipeService.updateRecipe(this.id , newRecipe);
    this.dataStorageService.storeRecipes();
    myform.reset();
    this.editMode = false;
    this.router.navigate( ['../'] , {relativeTo:this.route});
  }
  else {
    this.recipeService.addRecipe(newRecipe);
    this.dataStorageService.storeRecipe(newRecipe);
    myform.reset();
    this.router.navigate( ['../'] , {relativeTo:this.route});
  }
}

onCancel(){
  this.editMode =false ;
  this.router.navigate( ['../'] , {relativeTo:this.route});
}

onSelectIngredient(index : number){
 this.ingredientsEditMode = true ;
 this.ingredientSelectedID = index ;
 this.ingredientToEdit = this.recipeIngredients[index];
 this.ingredientName = this.ingredientToEdit.name ;
 this.ingredientAmount = this.ingredientToEdit.amount;

}

onSubmitIngredient() {
  const newIngredient = new Ingredient(this.ingredientName, this.ingredientAmount);
  if (this.ingredientName.trim() !== '' && this.ingredientAmount > 0) {
    if (this.ingredientsEditMode) {
      this.recipeIngredients[this.ingredientSelectedID] = newIngredient;
    } else {
      this.recipeIngredients.push(newIngredient);
    }
    
    this.ingredientName = '';
    this.ingredientAmount = 0;
    this.ingredientsEditMode = false;
  }
}

onDeleteIngredient() {
  this.recipeIngredients.splice(this.ingredientSelectedID , 1);
  this.ingredientName = '' ;
  this.ingredientAmount = 0 ;
  this.ingredientsEditMode = false ;
}

}
