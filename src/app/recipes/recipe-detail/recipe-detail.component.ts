import { Component , Input} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe !:Recipe ;

  constructor(private recipeService:RecipeService){}
  
  isDropdownOpen: boolean = false;
  isFetchDataActive: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  activateFetchData() {
    this.isFetchDataActive = true;
  }

  deactivateFetchData() {
    this.isFetchDataActive = false;
  }

  onAddToShoppingList(){
     this.recipeService.addIngredients(this.recipe.ingredients);
  }
}
