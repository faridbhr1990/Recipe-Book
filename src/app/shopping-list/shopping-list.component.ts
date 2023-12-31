import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit , OnDestroy{

  ingredients !: Ingredient[];
  igSubscription !: Subscription;

  constructor(private slService:ShoppingListService){}

  ngOnInit(){
    this.ingredients = this.slService.getIngredients();
    this.igSubscription = this.slService.ingredientChanged.subscribe(
      (ingredients : Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  
  onSelectIngredient(index : number){
    this.slService.ingredientIndexSelected.next(index);
  }


  ngOnDestroy() {
    this.igSubscription.unsubscribe();
  }

}
