import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";
import { SearchOptions } from "../../../models/searchOptions"
import { RecipeService } from "../../../services/recipe.service"
import { SearchService } from "../../../services/search.service"

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  defaultSearchOptions: SearchOptions = {
    minimumRating: -1,
    includedCategories: [],
    includedCookbooks: [],
    requiredIngredients: [],
  }

  selectedOptions: SearchOptions = this.defaultSearchOptions;

  knownCookbooks: string[]

  knownIngredients: string[]

  knownCategories: string[]

  refreshTableData: EventEmitter<void>;

  @Output()
  onSearchStarted: EventEmitter<void> = new EventEmitter()

  constructor(private recipeService: RecipeService, private searchService: SearchService, private changeDetector: ChangeDetectorRef) {
    this.knownCookbooks = this.recipeService.getAllKnownCookbooks()
    this.knownIngredients = this.recipeService.getAllKnownIngredients()
    this.knownCategories = this.recipeService.getAllKnownCategories()

    this.selectedOptions.includedCookbooks = [...this.knownCookbooks]

    this.refreshTableData = new EventEmitter()

    const lastSearchOptions = this.searchService.getLastSearchOptions()
    if(lastSearchOptions) {
      this.selectedOptions = lastSearchOptions
    }
  }

  public onNewRatingSelected(newRating: number) {
    this.selectedOptions.minimumRating = newRating
  }

  public updateRequiredIngredients(selectedItems: string[]) {
    this.selectedOptions.requiredIngredients = selectedItems
  }

  public updateIncludedCategories(selectedItems: string[]) {
    this.selectedOptions.includedCategories = selectedItems
  }

  public updateIncludedCookbooks(selectedItems: string[]) {
    this.selectedOptions.includedCookbooks = selectedItems
  }

  public onSearch(): void {
    this.searchService.search(this.selectedOptions)
    this.onSearchStarted.emit()
  }

  public clear(): void {
    this.selectedOptions = this.defaultSearchOptions
    this.selectedOptions.includedCookbooks = [...this.knownCookbooks]
    this.changeDetector.detectChanges()
    this.refreshTableData.emit()
  }
}
