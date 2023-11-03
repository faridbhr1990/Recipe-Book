import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute , Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ToastService } from 'src/app/shared/toast.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
   recipe !:Recipe ;
   id !: number ;

  constructor(private recipeService:RecipeService 
    , private router : Router
    , private route : ActivatedRoute
    , private dataStorageService : DataStorageService
    , private toastService : ToastService){}
  

  ngOnInit(){
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }
  
  onAddToShoppingList(){
     this.recipeService.addIngredients(this.recipe.ingredients);
     this.router.navigate(['/shopping-list']);
     this.toastService.setToastData(true, 'Ingredients Added To Shopping List.');
  }

  onEditRecipe(){
    this.router.navigate(['edit'] , {relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.dataStorageService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
    this.toastService.setToastData(true, 'One Recipe Deleted.');
  }
}
