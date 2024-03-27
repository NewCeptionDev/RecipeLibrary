import { EventEmitter, Injectable } from "@angular/core"
import { Recipe } from "../models/recipe"
import { RecipeChangeEvent } from "../models/recipeChangeEvent"
import { RecipeAction } from "../models/recipeAction"
import { SnackbarService } from "./snackbar.service"

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private static lastUsedRecipeId = 0

  private recipes: Recipe[] = []

  private knownCookbooks: string[] = []

  private knownIngredients: string[] = []

  private knownCategories: string[] = []

  private recipeChangeEvent: EventEmitter<RecipeChangeEvent> = new EventEmitter<RecipeChangeEvent>()

  constructor(private snackbarService: SnackbarService) {
    // Dependency Injection
  }

  public getAllKnownCookbooks(): string[] {
    return this.knownCookbooks
  }

  public getAllKnownIngredients(): string[] {
    return this.knownIngredients
  }

  public getAllKnownCategories(): string[] {
    return this.knownCategories
  }

  public initializeRecipeLibrary(recipes: Recipe[]) {
    this.recipes = recipes
    this.recipes.forEach((recipe) => this.updateKnown(recipe))

    RecipeService.lastUsedRecipeId = this.recipes
      .map((recipe) => recipe.id)
      .sort((a, b) => b - a)[0]
    this.initialLoad()
  }

  public importLibrary(recipes: Recipe[]) {
    recipes.forEach((recipe) => {
      const importedRecipe: Recipe = {
        id: RecipeService.getNextRecipeId(),
        recipeName: recipe.recipeName,
        cookbook: recipe.cookbook,
        ingredients: recipe.ingredients,
        categories: recipe.categories,
        rating: recipe.rating,
      }
      this.recipes.push(importedRecipe)
      this.updateKnown(importedRecipe)
    })
    this.recipeChanged(undefined, RecipeAction.ADD)
    this.snackbarService.libraryImportedFeedback()
  }

  public addRecipe(recipe: Recipe) {
    if (recipe.id < 0) {
      // eslint-disable-next-line no-param-reassign
      recipe.id = RecipeService.getNextRecipeId()
    }

    this.recipes.push(recipe)
    this.updateKnown(recipe)
    this.recipeChanged(recipe, RecipeAction.ADD)
    this.snackbarService.recipeAddedFeedback()
  }

  private updateKnown(recipe: Recipe) {
    if (!this.knownCookbooks.includes(recipe.cookbook)) {
      this.knownCookbooks.push(recipe.cookbook)
    }

    this.knownIngredients.push(
      ...recipe.ingredients.filter((ingredient) => !this.knownIngredients.includes(ingredient))
    )
    this.knownCategories.push(
      ...recipe.categories.filter((category) => !this.knownCategories.includes(category))
    )
  }

  private removeFromKnown(removedRecipe: Recipe) {
    if (!this.recipes.some((recipe) => recipe.cookbook === removedRecipe.cookbook)) {
      this.knownCookbooks.splice(this.knownCookbooks.indexOf(removedRecipe.cookbook), 1)
    }

    removedRecipe.ingredients.forEach((ingredient) => {
      if (!this.recipes.some((recipe) => recipe.ingredients.includes(ingredient))) {
        this.knownIngredients.splice(this.knownIngredients.indexOf(ingredient), 1)
      }
    })

    removedRecipe.categories.forEach((category) => {
      if (!this.recipes.some((recipe) => recipe.categories.includes(category))) {
        this.knownCategories.splice(this.knownCategories.indexOf(category), 1)
      }
    })
  }

  public removeRecipe(recipeId: number) {
    const recipe = this.recipes.find((recipeElement) => recipeElement.id === recipeId)

    if (recipe) {
      this.recipes.splice(this.recipes.indexOf(recipe), 1)
      this.removeFromKnown(recipe)
      this.recipeChanged(recipe, RecipeAction.DELETE)
      this.snackbarService.recipeRemovedFeedback()
    }
  }

  public getAllRecipes() {
    return [...this.recipes]
  }

  public getRecipeCount() {
    return this.recipes.length
  }

  public updateRecipe(recipeId: number, newRecipe: Recipe) {
    const oldRecipe = this.recipes.find((recipe) => recipe.id === recipeId)

    if (oldRecipe) {
      const index = this.recipes.indexOf(oldRecipe)

      this.recipes.splice(index, 1, newRecipe)

      this.updateKnown(newRecipe)
      this.removeFromKnown(oldRecipe)
      this.recipeChanged(newRecipe, RecipeAction.EDIT)
      this.snackbarService.recipeEditedFeedback()
    }
  }

  static getNextRecipeId(): number {
    this.lastUsedRecipeId++
    return this.lastUsedRecipeId
  }

  private initialLoad() {
    this.recipeChangeEvent.emit()
  }

  private recipeChanged(recipe: Recipe | undefined, event: RecipeAction) {
    this.recipeChangeEvent.emit({ recipe, event })
  }

  getRecipeChangeEvent(): EventEmitter<RecipeChangeEvent> {
    return this.recipeChangeEvent
  }
}
