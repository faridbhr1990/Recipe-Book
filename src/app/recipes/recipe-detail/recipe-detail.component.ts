import { Component , Input} from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe !:Recipe ;
  
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
}
