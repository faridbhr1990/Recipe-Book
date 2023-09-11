import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";


@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();  
  
  private recipes : Recipe[] =[
        new Recipe('Hamburger' 
        , 'for Test Description part of Recipe' 
        ,'https://www.aspicyperspective.com/wp-content/uploads/2020/07/best-hamburger-patties-1.jpg'
        ,[
          new Ingredient('bread' , 1),
          new Ingredient('meat' , 1),
          new Ingredient('onion' , 1),
          new Ingredient('ketchup sauce' , 1),
        ]
        )
        ,new Recipe('HotDog' 
        , 'for Test Description part of Recipe2' 
        ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR8ddbl3NzRT4345-FijWQ804PZCNJarv7dS2Omq0DS3DIHwjcEek8MggLpffthPhbAQA&usqp=CAU'
        ,[
          new Ingredient('bread' , 1),
          new Ingredient('hotdog' , 1),
          new Ingredient('tomato' , 1),
          new Ingredient('mustard' , 1),
        ]
        )
      ]

      constructor(private slService : ShoppingListService){}

      getRecepies(){
        return this.recipes.slice();
      }

      addIgredientsToShoppingList(ingredients : Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
}