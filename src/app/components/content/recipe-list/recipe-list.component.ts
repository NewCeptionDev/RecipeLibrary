import { Component, OnInit, inject } from "@angular/core"
import { Recipe } from "../../../models/recipe"
import { SearchService } from "../../../services/search.service"
import { SortOptions } from "../../../models/sortOptions"
import { SortDirection } from "../../../models/sortDirection"
import { SettingsService } from "src/app/services/settings.service"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"
import { SortByComponent } from "../../util/sort-by/sort-by.component";
import { NgClass } from "@angular/common";
import { RecipeOverviewComponent } from "../recipe-overview/recipe-overview.component";
import { RecipeDetailComponent } from "../recipe-detail/recipe-detail.component";

@Component({
    selector: "app-recipe-list",
    templateUrl: "./recipe-list.component.html",
    styleUrls: ["./recipe-list.component.scss"],
    imports: [SortByComponent, NgClass, RecipeOverviewComponent, RecipeDetailComponent]
})
export class RecipeListComponent implements OnInit {
  private searchService = inject(SearchService);
  private settingsService = inject(SettingsService);

  public showSearchResults = false

  public selectedRecipe: number = -1

  public shownRecipes: Recipe[] = []

  public currentSortOption: SortOptions = SortOptions.ALPHABET

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
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
