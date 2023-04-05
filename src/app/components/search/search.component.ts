import { Component } from "@angular/core"
import { SearchOptions } from "../../models/searchOptions";
import { RecipeService } from "../../services/recipe.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {

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
