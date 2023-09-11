import { Component } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  name !: string ;
  amount !: number ;

  constructor(private slService:ShoppingListService){}

  onAddItem(){
    const newingredient = new Ingredient(this.name , this.amount);
    this.slService.addIngredient(newingredient);
  }
}
