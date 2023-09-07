import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
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
