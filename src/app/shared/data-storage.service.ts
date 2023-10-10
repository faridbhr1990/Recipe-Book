import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    endPoint : string = 'https://ng-my-project-21759-default-rtdb.firebaseio.com/recipes.json' ;

    constructor(private http:HttpClient , private recipeService : RecipeService){}


    storeRecipes(){
        const recipes = this.recipeService.getRecepies();
        this.http.put(this.endPoint , recipes)
                    .subscribe(response => {
                        console.log(response);
                    });
    }

    storeRecipe(recipe: Recipe) {
        this.fetchRecipes().
            subscribe(existingRecipes => {
            existingRecipes.push(recipe);
            this.http.put(this.endPoint, existingRecipes)
                .subscribe(response => {
                    this.recipeService.setRecipes(existingRecipes);
                });
        });
    }

    deleteRecipe(id : number){
        this.fetchRecipes().subscribe(existingRecipe => {
            existingRecipe.splice(id , 1);
            this.http.put(this.endPoint , existingRecipe)
                .subscribe(response =>{
                    this.recipeService.setRecipes(existingRecipe);
                })
        });
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>(this.endPoint)
                    .pipe(
                        tap(
                            recipes => {
                                this.recipeService.setRecipes(recipes);
                            }
                           )
                        )
    }
}