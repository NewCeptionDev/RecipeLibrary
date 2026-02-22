import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core"
import { Recipe } from "src/app/models/recipe"
import { RecipeService } from "src/app/services/recipe.service"
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { SettingsService } from "src/app/services/settings.service"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"
import { MatFormField, MatLabel, MatInput, MatError } from "@angular/material/input"
import { AutocompleteWithAddFunctionComponent } from "../../util/autocomplete-with-add-function/autocomplete-with-add-function.component"
import { SelectedItemsDisplayComponent } from "../../util/selected-items-display/selected-items-display.component"
import { RatingDisplayComponent } from "../../util/rating-display/rating-display.component"
import { RequiredTimeDisplayComponent } from "../../util/required-time-display/required-time-display.component"
import { PageNumberDisplayComponent } from "../../util/page-number-display/page-number-display.component"
import { MatButton } from "@angular/material/button"

@Component({
  selector: "app-recipe-form",
  templateUrl: "./recipe-form.component.html",
  styleUrls: ["./recipe-form.component.scss"],
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatError,
    AutocompleteWithAddFunctionComponent,
    SelectedItemsDisplayComponent,
    RatingDisplayComponent,
    RequiredTimeDisplayComponent,
    PageNumberDisplayComponent,
    MatButton,
  ],
})
export class RecipeFormComponent implements OnInit {
  private recipeService = inject(RecipeService)

  private settingsService = inject(SettingsService)

  defaultRecipe: Recipe = {
    id: -1,
    recipeName: "",
    cookbook: "",
    ingredients: [],
    categories: [],
    rating: -1,
    requiredTime: undefined,
    pageNumber: "",
  }

  @Input()
  recipeInput: Recipe | undefined

  recipe: Recipe = structuredClone(this.defaultRecipe)

  editing: boolean = false

  knownCookbooks: string[] = []

  knownIngredients: string[] = []

  knownCategories: string[] = []

  recipeFormControl: FormControl = new FormControl(this.recipe.recipeName, Validators.required)

  @Output()
  public recipeChange: EventEmitter<void> = new EventEmitter()

  ngOnInit(): void {
    this.knownCookbooks = this.recipeService.getAllKnownCookbooks()
    this.knownIngredients = this.recipeService.getAllKnownIngredients()
    this.knownCategories = this.recipeService.getAllKnownCategories()

    this.recipeFormControl.valueChanges.subscribe((value) => {
      this.recipe.recipeName = value
    })

    if (this.recipeInput) {
      this.editing = true
      this.recipe = structuredClone(this.recipeInput)
      this.recipeFormControl.setValue(this.recipe.recipeName)
    }
  }

  public updateRating(newRating: number) {
    this.recipe.rating = newRating
  }

  public updateSelectedIngredients(ingredientList: string[]) {
    this.recipe.ingredients = ingredientList
  }

  public updateSelectedCategories(categoryList: string[]) {
    this.recipe.categories = categoryList
  }

  public updateCookbookName(name: string) {
    this.recipe.cookbook = name
  }

  public updateRequiredTime(newRequiredTime: number | undefined) {
    this.recipe.requiredTime = newRequiredTime
  }

  public updatePageNumber(newPageNumber: string) {
    this.recipe.pageNumber = newPageNumber
  }

  public finalizeRecipe() {
    if (this.recipeFormControl.invalid) {
      this.recipeFormControl.markAsTouched()
      return
    }

    if (this.editing && this.recipeInput) {
      this.recipeService.updateRecipe(this.recipeInput.id, this.recipe)
    } else {
      this.recipeService.addRecipe(this.recipe)
    }
    this.recipeChange.emit()
  }

  public hasRecipeChanged() {
    return this.recipeInput
      ? !Recipe.equals(this.recipeInput, this.recipe)
      : !Recipe.equals(this.recipe, this.defaultRecipe)
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

  public isPageNumberRecipeFeatureEnabled() {
    return this.getEnabledOptionalRecipeFeatures().includes(OptionalRecipeFeature.PAGE_NUMBER)
  }

  private getEnabledOptionalRecipeFeatures() {
    return this.settingsService.getEnabledRecipeFeatures()
  }
}
