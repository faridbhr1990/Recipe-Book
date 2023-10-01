import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http:HttpClient , private recipeService : RecipeService){}


    storeData(){
        const recipes = this.recipeService.getRecepies();
        this.http.put('https://ng-my-project-21759-default-rtdb.firebaseio.com/recipes.json' , recipes)
                    .subscribe(response => {
                        console.log(response);
                    });
    }

    fetchData(){
        return this.http.get<Recipe[]>('https://ng-my-project-21759-default-rtdb.firebaseio.com/recipes.json')
                    .pipe(
                        tap(
                            recipes => {
                                this.recipeService.setRecipes(recipes);
                            }
                           )
                        )
    }
}