import { Component, OnInit } from "@angular/core"
import { Recipe } from "../../../models/recipe"
import { SearchService } from "../../../services/search.service"
import { SortOptions } from "../../../models/sortOptions"
import { SortDirection } from "../../../models/sortDirection"
import { SettingsService } from "src/app/services/settings.service"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"

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

  constructor(private searchService: SearchService, private settingsService: SettingsService) {
    // Dependency Injection
  }

  ngOnInit(): void {
    this.searchService.getSearchResultsEventEmitter().subscribe((newSearchResults) => {
      this.showSearchResults = true
      this.shownRecipes = newSearchResults
    })
  }

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

  public isRatingRecipeFeatureEnabled() {
    return this.getEnabledOptionalRecipeFeatures().includes(OptionalRecipeFeature.RATING)
  }

  public isRequiredTimeRecipeFeatureEnabled() {
    return this.getEnabledOptionalRecipeFeatures().includes(OptionalRecipeFeature.REQUIRED_TIME)
  }

  private getEnabledOptionalRecipeFeatures() {
    return this.settingsService.getEnabledRecipeFeatures()
  }
}
