import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipestartComponent } from "./recipes/recipestart/recipestart.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";

const appRoutes : Routes = [
  { path:'' , redirectTo:'recipes' , pathMatch:'full' , data:{breadcrumb: 'Recipes' }},
  { path:'recipes' , component:RecipesComponent ,data:{breadcrumb: 'Recipes' }, children:[
    {path: '' , component:RecipestartComponent , data:{breadcrumb: 'Recipes' }},
    {path: 'new' , component:RecipeEditComponent , data:{breadcrumb: 'New' }},
    {path: ':id' , component:RecipeDetailComponent , resolve:[RecipesResolverService] , data:{breadcrumb: ':id' }},
    {path: ':id/edit' , component:RecipeEditComponent , resolve:[RecipesResolverService], data:{breadcrumb: 'Edit' }},
  ]},
  { path:'shopping-list' , component:ShoppingListComponent , data:{breadcrumb: 'Shopping-List' }},
]


@NgModule({ 
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]

})
export class AppRoutingModule {

}