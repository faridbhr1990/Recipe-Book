import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
     name : string ;
     description : string ;
     imagepath : string ;
     ingredients : Ingredient[];

    constructor(name:string , desc:string , imgpath:string , ingredient:Ingredient[]){
        this.name = name ;
        this.description = desc ;
        this.imagepath = imgpath ;
        this.ingredients = ingredient;
    }
}