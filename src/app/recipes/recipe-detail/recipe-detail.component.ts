import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute , Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
   recipe !:Recipe ;
   id !: number ;

  constructor(private recipeService:RecipeService 
    ,private router : Router
    , private route : ActivatedRoute){}
  

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
  }

  onEditRecipe(){
    this.router.navigate(['edit'] , {relativeTo:this.route});
  }
}
