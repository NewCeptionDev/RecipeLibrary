import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, inject } from "@angular/core"
import { SearchOptions } from "../../../models/searchOptions"
import { RecipeService } from "../../../services/recipe.service"
import { SearchService } from "../../../services/search.service"
import { SortOptions } from "../../../models/sortOptions"
import { SortDirection } from "../../../models/sortDirection"
import { SettingsService } from "src/app/services/settings.service"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"
import { SelectedItemsDisplayComponent } from "../../util/selected-items-display/selected-items-display.component"
import { RatingDisplayComponent } from "../../util/rating-display/rating-display.component"
import { RequiredTimeDisplayComponent } from "../../util/required-time-display/required-time-display.component"
import { MatButton } from "@angular/material/button"

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  imports: [
    SelectedItemsDisplayComponent,
    RatingDisplayComponent,
    RequiredTimeDisplayComponent,
    MatButton,
  ],
})
export class SearchComponent implements OnInit {
  private recipeService = inject(RecipeService)

  private searchService = inject(SearchService)

  private changeDetector = inject(ChangeDetectorRef)

  private settingsService = inject(SettingsService)

  defaultSearchOptions: SearchOptions = {
    minimumRating: -1,
    maximumRequiredTime: undefined,
    includedCategories: [],
    includedCookbooks: [],
    requiredIngredients: [],
    sortOption: SortOptions.ALPHABET,
    sortDirection: SortDirection.ASC,
  }

  selectedOptions: SearchOptions = this.defaultSearchOptions

  knownCookbooks: string[] = []

  knownIngredients: string[] = []

  knownCategories: string[] = []

  refreshTableData: EventEmitter<void> = new EventEmitter()

  @Output()
  searchStarted: EventEmitter<void> = new EventEmitter()

  ngOnInit(): void {
    this.knownCookbooks = this.recipeService.getAllKnownCookbooks()
    this.knownIngredients = this.recipeService.getAllKnownIngredients()
    this.knownCategories = this.recipeService.getAllKnownCategories()

    this.selectedOptions.includedCookbooks = [...this.knownCookbooks]

    const lastSearchOptions = this.searchService.getLastSearchOptions()
    if (lastSearchOptions) {
      this.selectedOptions = lastSearchOptions
    }
  }

  public onNewRatingSelected(newRating: number) {
    this.selectedOptions.minimumRating = newRating
  }

  public onNewRequiredTimeSelected(newRequiredTime: number) {
    this.selectedOptions.maximumRequiredTime = newRequiredTime
  }

  public updateRequiredIngredients(selectedItems: string[]) {
    this.selectedOptions.requiredIngredients = selectedItems
    this.refreshTableData.emit()
  }

  public updateIncludedCategories(selectedItems: string[]) {
    this.selectedOptions.includedCategories = selectedItems
    this.refreshTableData.emit()
  }

  public updateIncludedCookbooks(selectedItems: string[]) {
    this.selectedOptions.includedCookbooks = selectedItems
    this.refreshTableData.emit()
  }

  public onSearch(): void {
    this.searchService.search(this.selectedOptions)
    this.searchStarted.emit()
  }

  public clear(): void {
    this.selectedOptions = this.defaultSearchOptions
    this.selectedOptions.includedCookbooks = [...this.knownCookbooks]
    this.changeDetector.detectChanges()
    this.refreshTableData.emit()
  }

  public isCategoryRecipeFeatureEnabled() {
    return this.getEnabledOptionalRecipeFeatures().includes(OptionalRecipeFeature.CATEGORY)
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
