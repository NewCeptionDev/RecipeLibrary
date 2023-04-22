import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../models/recipe";
import { RecipeService } from "./recipe.service";
import { SearchOptions } from "../models/searchOptions";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private publishSearchResults: EventEmitter<Recipe[]> = new EventEmitter<Recipe[]>()

  constructor(private recipeService: RecipeService) { }

  public getSearchResultsEventEmitter(): EventEmitter<Recipe[]> {
    return this.publishSearchResults;
  }

  public search(searchOptions: SearchOptions): void {
    const allRecipes = this.recipeService.getAllRecipes()

    const resultList = allRecipes
      .filter(recipe => recipe.rating >= searchOptions.minimumRating)
      .filter(recipe => searchOptions.includedCookbooks.length > 0 ? searchOptions.includedCookbooks.includes(recipe.cookbook) : true)
      .filter(recipe => searchOptions.includedCategories.every(category => recipe.categories.includes(category)))
      .filter(recipe => searchOptions.requiredIngredients.every(ingredient => recipe.ingredients.includes(ingredient)))

    this.publishSearchResults.emit(resultList)
  }
}
