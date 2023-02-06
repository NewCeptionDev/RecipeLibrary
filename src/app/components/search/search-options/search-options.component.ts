import { Component } from "@angular/core"
import { RecipeService } from "../../../services/recipe.service"
import { SearchOptions } from "../../../models/searchOptions"

@Component({
  selector: "app-search-options",
  templateUrl: "./search-options.component.html",
  styleUrls: ["./search-options.component.scss"],
})
export class SearchOptionsComponent {
  selectedOptions: SearchOptions = {
    searchTerm: "",
    minimumRating: -1,
    includedCategories: [],
    includedCookbooks: [],
    requiredIngredients: [],
  }

  knownCookbooks: string[]

  knownIngredients: string[]

  knownCategories: string[]

  constructor(private recipeService: RecipeService) {
    this.knownCookbooks = this.recipeService.getAllKnownCookbooks()
    this.knownIngredients = this.recipeService.getAllKnownIngredients()
    this.knownCategories = this.recipeService.getAllKnownCategories()

    this.selectedOptions.includedCookbooks = this.knownCookbooks
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
}
