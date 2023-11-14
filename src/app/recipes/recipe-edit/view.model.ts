import { Ingredient } from "src/app/shared/ingredient.model";
import { Recipe } from "../recipe.model";

export class ViewModel{
    id !: number ;
    editMode = false ;
    ingredientsEditMode = false ;
    recipeIngredients !: Ingredient[] ;
    recipe !: Recipe ;
    recipeName ='' ;
    recipeImgUrl ='';
    recipeDescription ='';
    ingredientToEdit !: Ingredient ;
    ingredientName : string = '';
    ingredientAmount !: number;
    ingredientSelectedID !: number;
}