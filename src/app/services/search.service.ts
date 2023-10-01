import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../models/recipe";
import { RecipeService } from "./recipe.service";
import { SearchOptions } from "../models/searchOptions";
import { RecipeAction } from "../models/recipeAction";
import { RecipeChangeEvent } from "../models/recipeChangeEvent";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private publishSearchResults: EventEmitter<Recipe[]> = new EventEmitter<Recipe[]>()

  constructor(private recipeService: RecipeService) {
    this.recipeService.recipeChangeEvent.subscribe(changeEvent => this.adjustSearchResultsIfNeeded(changeEvent))
  }

  private lastSearchResults: Recipe[] = [];
  private lastSearchOptions: SearchOptions | undefined;

  public getLastSearchOptions(): SearchOptions | undefined {
    return this.lastSearchOptions
  }

  public getSearchResultsEventEmitter(): EventEmitter<Recipe[]> {
    return this.publishSearchResults
  }

  public adjustSearchResultsIfNeeded(recipeChangeEvent: RecipeChangeEvent) {
    if(!this.lastSearchOptions) {
      return
    }

    const recipeInSearch = this.getFilteredRecipes([recipeChangeEvent.recipe], this.lastSearchOptions).length > 0

    if(recipeChangeEvent.event === RecipeAction.ADD && recipeInSearch) {
      this.lastSearchResults.push(recipeChangeEvent.recipe)
    }

    if((recipeChangeEvent.event === RecipeAction.EDIT || recipeChangeEvent.event === RecipeAction.DELETE)
      && this.lastSearchResults.length > 0) {
      const index = this.lastSearchResults.findIndex(recipeFromList => recipeFromList.id === recipeChangeEvent.recipe.id)
      if(index !== -1) {
        if(recipeChangeEvent.event === RecipeAction.EDIT && recipeInSearch) {
          this.lastSearchResults.splice(index, 1, recipeChangeEvent.recipe)
        } else {
          this.lastSearchResults.splice(index, 1)
        }
      } else if(recipeInSearch) {
        this.lastSearchResults.push(recipeChangeEvent.recipe)
      }
    }

    this.publishSearchResults.emit(this.lastSearchResults)
  }

  public search(searchOptions: SearchOptions): void {
    const allRecipes = this.recipeService.getAllRecipes()

    const resultList = this.getFilteredRecipes(allRecipes, searchOptions)

    this.lastSearchResults = resultList
    this.lastSearchOptions = searchOptions

    this.publishSearchResults.emit(resultList)
  }

  private getFilteredRecipes(recipes: Recipe[], searchOptions: SearchOptions): Recipe[] {
    return recipes
      .filter((recipe) => recipe.rating >= searchOptions.minimumRating)
      .filter((recipe) =>
        searchOptions.includedCookbooks.length > 0
          ? searchOptions.includedCookbooks.includes(recipe.cookbook)
          : true
      )
      .filter((recipe) =>
        searchOptions.includedCategories.every((category) => recipe.categories.includes(category))
      )
      .filter((recipe) =>
        searchOptions.requiredIngredients.every((ingredient) =>
          recipe.ingredients.includes(ingredient)
        )
      )
  }
}
