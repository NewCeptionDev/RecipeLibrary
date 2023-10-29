import { Component, OnInit } from "@angular/core"
import { Recipe } from "../../../models/recipe"
import { SearchService } from "../../../services/search.service"
import { SortOptions } from "../../../models/sortOptions"
import { SortDirection } from "../../../models/sortDirection"

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"],
})
export class RecipeListComponent implements OnInit {
  public showSearchResults = false

  public selectedRecipe: number = -1

  public shownRecipes: Recipe[] = []

  public currentSortOption: SortOptions = SortOptions.ALPHABET

  constructor(private searchService: SearchService) {
    this.searchService.getSearchResultsEventEmitter().subscribe((newSearchResults) => {
      this.showSearchResults = true
      this.shownRecipes = newSearchResults
    })
  }

  ngOnInit(): void {}

  selectRecipe(selectedRecipe: number): void {
    if (this.selectedRecipe === selectedRecipe) {
      this.selectedRecipe = -1
    } else {
      this.selectedRecipe = selectedRecipe
    }
  }

  protected readonly SortOptions = SortOptions

  public sortOptionAdjusted(sortOption: SortOptions, direction: SortDirection) {
    this.currentSortOption = sortOption
    this.searchService.adjustSortFilter(sortOption, direction)
  }
}
