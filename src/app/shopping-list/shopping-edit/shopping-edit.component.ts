import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{
  @ViewChild('myForm') slForm !: NgForm ;
  editMode = false;
  editedItemIndex !: number ;
  ingredientForEdit !: Ingredient ;


  constructor(private slService:ShoppingListService){}

  ngOnInit() {
    this.slService.ingredientIndexSelected.subscribe(
      (index : number)=>{
        this.editMode =true ;
        this.editedItemIndex = index ;
        this.ingredientForEdit = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.ingredientForEdit.name ,
          amount : this.ingredientForEdit.amount
        })
      }
    );
  }

  onAddItem(form : NgForm){
    const value = form.value;
    const newingredient = new Ingredient(value.name , value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex , newingredient);
    }
    else {
      this.slService.addIngredient(newingredient);
    }
    this.editMode =false ;
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }
}
