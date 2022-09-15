import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [];

  private knownCookbooks: string[] = [];

  private knownIngredients: string[] = [];

  private knownCategories: string[] = [];

  constructor() { }

  public getAllKnownCookbooks(): string[] {
    return this.knownCookbooks;
  }

  public getAllKnownIngredients(): string[] {
    return this.knownIngredients;
  }

  public getAllKnownCategories(): string[] {
    return this.knownCategories;
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  
    if(!this.knownCookbooks.includes(recipe.cookbook)) {
      this.knownCookbooks.push(recipe.cookbook);
    }

    this.knownIngredients.push(...recipe.ingredients.filter(ingredient => !this.knownIngredients.includes(ingredient)))
    this.knownCategories.push(...recipe.categories.filter(category => !this.knownCategories.includes(category)))
  }
}
