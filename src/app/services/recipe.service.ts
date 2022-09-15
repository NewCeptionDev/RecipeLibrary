import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [{
    recipeName: "Pizza",
    cookbook: "Kopf",
    ingredients: ["Teig", "Tomatensoße", "Streukäse", "Salami"],
    categories: ["Fleisch"],
    rating: 5
  }, {
    recipeName: "Nudelteig",
    cookbook: "Kopf",
    ingredients: ["Mehl", "Wasser", "Olivenöl", "Hefe"],
    categories: ["Vegetarisch"],
    rating: 2
  }];

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

  public removeRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  public getAllRecipes() {
    return [...this.recipes];
  }
}
