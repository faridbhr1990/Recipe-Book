import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute , Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Breadcrumb } from 'src/app/breadcrumb/breadcrumb.interface';
import { BreadcrumbService } from 'src/app/breadcrumb/breadcrumb.service';


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
    , private breadcrumbService : BreadcrumbService){}
  

  ngOnInit(){
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
        const breadcrumb: Breadcrumb = {
          label: this.recipe.name,
          url: '/recipes/id'
        };
        this.breadcrumbService.addBreadcrumb(breadcrumb);
      }
    )
  }
  
  onAddToShoppingList(){
     this.recipeService.addIngredients(this.recipe.ingredients);
     this.router.navigate(['/shopping-list']);
  }

  onEditRecipe(){
    this.router.navigate(['edit'] , {relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.dataStorageService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
