import { Injectable } from "@angular/core";
import { root } from "rxjs/internal-compatibility";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
@Injectable({
    providedIn: 'root'
})
export class DataStorageService{
    constructor(private http: HttpClient, private recipesService: RecipeService){}

    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://ng-course-recipe-book-5605f-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response =>{
            console.log(response);
        })
    }

    fetchRecipes(){
        this.http
        .get<Recipe[]>('https://ng-course-recipe-book-5605f-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes =>{ 
            return recipes.map(recipe =>{
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            });
        }))
        .subscribe(recipes=>{
            this.recipesService.setRecipes(recipes);
        })   
    }

}