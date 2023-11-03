import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast.service';

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


  constructor(private slService:ShoppingListService
             ,private toastService:ToastService ){}

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

  onSubmit(form : NgForm){
    const value = form.value;
    const newingredient = new Ingredient(value.name , value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex , newingredient);
      this.toastService.setToastData(true , 'Ingredient Updated');
    }
    else {
      this.slService.addIngredient(newingredient);
      this.toastService.setToastData(true , 'New Ingredient Added');
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
    this.toastService.setToastData(true , 'Ingredient Deleted');
  }
}
