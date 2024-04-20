import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { Recipe } from "src/app/models/recipe"
import { RecipeService } from "src/app/services/recipe.service"
import { FormControl, Validators } from "@angular/forms"
import { SettingsService } from "src/app/services/settings.service"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"

@Component({
  selector: "app-recipe-form",
  templateUrl: "./recipe-form.component.html",
  styleUrls: ["./recipe-form.component.scss"],
})
export class RecipeFormComponent implements OnInit {
  defaultRecipe: Recipe = {
    id: -1,
    recipeName: "",
    cookbook: "",
    ingredients: [],
    categories: [],
    rating: -1,
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

  constructor(private recipeService: RecipeService, private settingsService: SettingsService) {
    // Dependency Injection
  }

  ngOnInit(): void {
    this.knownCookbooks = this.recipeService.getAllKnownCookbooks()
    this.knownIngredients = this.recipeService.getAllKnownIngredients()
    this.knownCategories = this.recipeService.getAllKnownCategories()

    this.recipeFormControl.valueChanges.subscribe((value) => {
      this.recipe.recipeName = value
    })

    if (this.recipeInput) {
      this.editing = true
      this.recipe = { ...this.recipeInput }
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

  private getEnabledOptionalRecipeFeatures() {
    return this.settingsService.getEnabledRecipeFeatures()
  }
}
