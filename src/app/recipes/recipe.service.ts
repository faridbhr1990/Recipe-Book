import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();  
  
  private recipes : Recipe[] =[
        new Recipe('Hamburger' 
        , 'for Test Description part of Recipe' 
        ,'https://www.aspicyperspective.com/wp-content/uploads/2020/07/best-hamburger-patties-1.jpg')
        ,new Recipe('HotDog' 
        , 'for Test Description part of Recipe2' 
        ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR8ddbl3NzRT4345-FijWQ804PZCNJarv7dS2Omq0DS3DIHwjcEek8MggLpffthPhbAQA&usqp=CAU')
      ]


      getRecepies(){
        return this.recipes.slice();
      }
}