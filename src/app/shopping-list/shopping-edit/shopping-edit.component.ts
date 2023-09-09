import { Component , ElementRef, ViewChild , EventEmitter , Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  // @ViewChild('nameInput' , {static:false}) nameInputRef !: ElementRef;
  // @ViewChild('amountInput' , {static:false}) amountInputRef !: ElementRef;

  name !: string ;
  amount !: number ;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onAddItem(){
   
    const newingredient = new Ingredient(this.name , this.amount);
    debugger;
    this.ingredientAdded.emit(newingredient);

  }
}
