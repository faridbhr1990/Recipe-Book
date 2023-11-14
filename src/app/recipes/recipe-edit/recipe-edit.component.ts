import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ToastService } from 'src/app/shared/toast.service';
import { ViewModel } from './view.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  @ViewChild('editForm') editForm !: NgForm ;
  viewModel = new ViewModel;

  constructor(
              private route : ActivatedRoute , 
              private recipeService : RecipeService,
              private router : Router,
              private dataStorageService : DataStorageService,
              private toastService : ToastService
              ){}



  ngOnInit(){
   this.route.params.subscribe(
    (params : Params) => {
      this.viewModel.id = params['id'];
      this.viewModel.editMode = params['id'] != null ;
    }
  )
  if(this.viewModel.editMode){
    this.viewModel.recipe = this.recipeService.getRecipe(this.viewModel.id);
    this.viewModel.recipeIngredients = this.viewModel.recipe.ingredients;
    this.viewModel.recipeName = this.viewModel.recipe.name;
    this.viewModel.recipeImgUrl = this.viewModel.recipe.imagepath;
    this.viewModel.recipeDescription = this.viewModel.recipe.description;
  }
  else {
    this.viewModel.recipeIngredients = [];
  }
}

onSubmit(myform : NgForm){
  const value = myform.value;
  this.viewModel.recipeName = value.name;
  this.viewModel.recipeImgUrl = value.imageurl;
  this.viewModel.recipeDescription = value.description;
  const newRecipe = new Recipe
  (this.viewModel.recipeName , 
   this.viewModel.recipeDescription , 
   this.viewModel.recipeImgUrl , 
   this.viewModel.recipeIngredients
   );

  if(this.viewModel.editMode){
    this.recipeService.updateRecipe(this.viewModel.id , newRecipe);
    this.dataStorageService.storeRecipes();
    myform.reset();
    this.viewModel.editMode = false;
    this.router.navigate( ['../'] , {relativeTo:this.route});
    this.toastService.setToastData(true, 'Recipe Updated.');
  }
  else {
    this.recipeService.addRecipe(newRecipe);
    this.dataStorageService.storeRecipe(newRecipe);
    myform.reset();
    this.router.navigate( ['../'] , {relativeTo:this.route});
    this.toastService.setToastData(true, 'New Recipe Added.');
  }
}

onCancel(){
  this.viewModel.editMode =false ;
  this.router.navigate( ['../'] , {relativeTo:this.route});
}

onSelectIngredient(index : number){
 this.viewModel.ingredientsEditMode = true ;
 this.viewModel.ingredientSelectedID = index ;
 this.viewModel.ingredientToEdit = this.viewModel.recipeIngredients[index];
 this.viewModel.ingredientName = this.viewModel.ingredientToEdit.name ;
 this.viewModel.ingredientAmount = this.viewModel.ingredientToEdit.amount;

}

onSubmitIngredient() {
  const newIngredient = new Ingredient(this.viewModel.ingredientName, this.viewModel.ingredientAmount);
  if (this.viewModel.ingredientName.trim() !== '' && this.viewModel.ingredientAmount > 0) {
    if (this.viewModel.ingredientsEditMode) {
      this.viewModel.recipeIngredients[this.viewModel.ingredientSelectedID] = newIngredient;
      this.toastService.setToastData(true, 'One Ingredient Updated.');
    } else {
      this.viewModel.recipeIngredients.push(newIngredient);
      this.toastService.setToastData(true, 'One Ingredient Added.');
    }
    
    this.viewModel.ingredientName = '';
    this.viewModel.ingredientAmount = 0;
    this.viewModel.ingredientsEditMode = false;
    
  }
}

onDeleteIngredient() {
  this.viewModel.recipeIngredients.splice(this.viewModel.ingredientSelectedID , 1);
  this.toastService.setToastData(true, 'One Ingredient Deleted.');
  this.viewModel.ingredientName = '' ;
  this.viewModel.ingredientAmount = 0 ;
  this.viewModel.ingredientsEditMode = false ;
  
}

}
