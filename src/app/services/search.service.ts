import { EventEmitter, Injectable } from "@angular/core"
import { Recipe } from "../models/recipe"
import { RecipeService } from "./recipe.service"
import { SearchOptions } from "../models/searchOptions"
import { RecipeAction } from "../models/recipeAction"
import { RecipeChangeEvent } from "../models/recipeChangeEvent"
import { SortDirection } from "../models/sortDirection"
import { SortOptions } from "../models/sortOptions"

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private publishSearchResults: EventEmitter<Recipe[]> = new EventEmitter<Recipe[]>()

  constructor(private recipeService: RecipeService) {
    this.recipeService
      .getRecipeChangeEvent()
      .subscribe((changeEvent) => this.adjustSearchResultsIfNeeded(changeEvent))
  }

  private lastSearchResults: Recipe[] = []

  private lastSearchOptions: SearchOptions | undefined

  public getLastSearchOptions(): SearchOptions | undefined {
    return this.lastSearchOptions
  }

  public getSearchResultsEventEmitter(): EventEmitter<Recipe[]> {
    return this.publishSearchResults
  }

  public adjustSearchResultsIfNeeded(recipeChangeEvent: RecipeChangeEvent) {
    if (!this.lastSearchOptions) {
      return
    }

    if (recipeChangeEvent.recipe === undefined) {
      this.search(this.lastSearchOptions)
    } else {
      const recipeInSearch =
        this.getFilteredRecipes([recipeChangeEvent.recipe], this.lastSearchOptions).length > 0

      if (recipeChangeEvent.event === RecipeAction.ADD && recipeInSearch) {
        this.lastSearchResults.push(recipeChangeEvent.recipe)
      }

      if (
        (recipeChangeEvent.event === RecipeAction.EDIT ||
          recipeChangeEvent.event === RecipeAction.DELETE) &&
        this.lastSearchResults.length > 0
      ) {
        const index = this.lastSearchResults.findIndex(
          (recipeFromList) => recipeFromList.id === recipeChangeEvent.recipe!.id
        )
        if (index !== -1) {
          if (recipeChangeEvent.event === RecipeAction.EDIT && recipeInSearch) {
            this.lastSearchResults.splice(index, 1, recipeChangeEvent.recipe)
          } else {
            this.lastSearchResults.splice(index, 1)
          }
        } else if (recipeInSearch) {
          this.lastSearchResults.push(recipeChangeEvent.recipe)
        }
      }

      this.publishSearchResults.emit(this.lastSearchResults)
    }
  }

  public search(searchOptions: SearchOptions): void {
    const allRecipes = this.recipeService.getAllRecipes()

    let resultList = this.getFilteredRecipes(allRecipes, searchOptions)

    if (searchOptions.sortOption !== undefined && searchOptions.sortDirection !== undefined) {
      resultList = this.sortResultList(
        searchOptions.sortOption,
        searchOptions.sortDirection,
        resultList
      )
    }

    this.lastSearchResults = resultList
    this.lastSearchOptions = searchOptions

    this.publishSearchResults.emit(resultList)
  }

  private getFilteredRecipes(recipes: Recipe[], searchOptions: SearchOptions): Recipe[] {
    return recipes
      .filter((recipe) => recipe.rating >= searchOptions.minimumRating)
      .filter(
        (recipe) =>
          !searchOptions.maximumRequiredTime ||
          (recipe.requiredTime && recipe.requiredTime <= searchOptions.maximumRequiredTime)
      )
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

  private sortResultList(
    sortOption: SortOptions,
    direction: SortDirection,
    list: Recipe[]
  ): Recipe[] {
    if (sortOption === SortOptions.ALPHABET) {
      if (direction === SortDirection.ASC) {
        return list.sort((a, b) =>
          a.recipeName.toLowerCase() < b.recipeName.toLowerCase() ? -1 : 1
        )
      }
      return list.sort((a, b) => (a.recipeName < b.recipeName ? 1 : -1))
    } else if (sortOption === SortOptions.RATING) {
      if (direction === SortDirection.ASC) {
        return list.sort((a, b) => a.rating - b.rating)
      }
      return list.sort((a, b) => b.rating - a.rating)
    } else if (sortOption === SortOptions.REQUIRED_TIME) {
      if (direction === SortDirection.ASC) {
        return list.sort(
          (a, b) => this.safeMapNumber(a.requiredTime) - this.safeMapNumber(b.requiredTime)
        )
      }
      return list.sort(
        (a, b) => this.safeMapNumber(b.requiredTime) - this.safeMapNumber(a.requiredTime)
      )
    }

    throw new Error("Unknown SortOption")
  }

  public adjustSortFilter(newSortOption: SortOptions, newSortDirection: SortDirection) {
    if (!this.lastSearchOptions) {
      throw new Error("Should not be called without a previous search")
    }

    this.lastSearchOptions.sortOption = newSortOption
    this.lastSearchOptions.sortDirection = newSortDirection

    this.search(this.lastSearchOptions)
  }

  private safeMapNumber(value: number | undefined) {
    if (value !== undefined) {
      return value
    }
    return Number.MAX_SAFE_INTEGER
  }
}
