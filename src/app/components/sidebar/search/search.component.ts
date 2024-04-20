import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core"
import { SearchOptions } from "../../../models/searchOptions"
import { RecipeService } from "../../../services/recipe.service"
import { SearchService } from "../../../services/search.service"
import { SortOptions } from "../../../models/sortOptions"
import { SortDirection } from "../../../models/sortDirection"
import { SettingsService } from "src/app/services/settings.service"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  defaultSearchOptions: SearchOptions = {
    minimumRating: -1,
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

  constructor(
    private recipeService: RecipeService,
    private searchService: SearchService,
    private changeDetector: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
    // Dependency Injection
  }

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

  private getEnabledOptionalRecipeFeatures() {
    return this.settingsService.getEnabledRecipeFeatures()
  }
}
