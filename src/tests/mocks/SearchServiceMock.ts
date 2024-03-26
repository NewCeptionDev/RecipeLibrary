import { EventEmitter } from "@angular/core"
import { Recipe } from "../../app/models/recipe"
import { SortOptions } from "../../app/models/sortOptions"
import { SortDirection } from "../../app/models/sortDirection"

export class SearchServiceMock {
  private publishSearchResults: EventEmitter<Recipe[]> = new EventEmitter<Recipe[]>()

  public getSearchResultsEventEmitter(): EventEmitter<Recipe[]> {
    return this.publishSearchResults
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public adjustSortFilter(newSortOption: SortOptions, newSortDirection: SortDirection) {
    // Mock implementation
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public search(options: never) {
    // Mock implementation
  }

  public getLastSearchOptions() {
    return {
      minimumRating: 1,
      includedCategories: [],
      includedCookbooks: [],
      requiredIngredients: [],
      sortOption: SortOptions.RATING,
      sortDirection: SortDirection.DESC,
    }
  }
}
