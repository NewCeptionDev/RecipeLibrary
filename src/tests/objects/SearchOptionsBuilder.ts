import { SortOptions } from "../../app/models/sortOptions";
import { SortDirection } from "../../app/models/sortDirection";
import { SearchOptions } from "../../app/models/searchOptions";

export class SearchOptionsBuilder {
  private minimumRating: number = 1

  private requiredIngredients: string[] = []

  private includedCategories: string[] = []

  private includedCookbooks: string[] = []

  private sortOption?: SortOptions

  private sortDirection?: SortDirection

  withMinimumRating = (rating: number): SearchOptionsBuilder => {
   this.minimumRating = rating
   return this
  }

  withRequiredIngredients = (ingredients: string[]): SearchOptionsBuilder => {
    this.requiredIngredients = ingredients
    return this
  }

  withIncludedCategories = (categories: string[]): SearchOptionsBuilder => {
    this.includedCategories = categories
    return this
  }

  withIncludedCookbooks = (cookbooks: string[]): SearchOptionsBuilder => {
    this.includedCookbooks = cookbooks
    return this
  }

  withSortOption = (sortOption: SortOptions): SearchOptionsBuilder => {
    this.sortOption = sortOption
    return this
  }

  withSortDirection = (sortDirection: SortDirection): SearchOptionsBuilder => {
    this.sortDirection = sortDirection
    return this
  }

  build = (): SearchOptions => ({
      minimumRating: this.minimumRating,
      requiredIngredients: this.requiredIngredients,
      includedCategories: this.includedCategories,
      includedCookbooks: this.includedCookbooks,
      sortOption: this.sortOption,
      sortDirection: this.sortDirection
    })

  static emptyOptions = () => new SearchOptionsBuilder().build()
}
