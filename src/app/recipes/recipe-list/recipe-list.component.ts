import { Component , EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  
  recipes : Recipe[] =[
    new Recipe('Hamburger' 
    , 'for Test Description part of Recipe' 
    ,'https://www.aspicyperspective.com/wp-content/uploads/2020/07/best-hamburger-patties-1.jpg')
    ,new Recipe('HotDog' 
    , 'for Test Description part of Recipe2' 
    ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR8ddbl3NzRT4345-FijWQ804PZCNJarv7dS2Omq0DS3DIHwjcEek8MggLpffthPhbAQA&usqp=CAU')
  ]

  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
