import { Recipe } from "../../app/models/recipe"
import { EventEmitter } from "@angular/core"
import { RecipeChangeEvent } from "../../app/models/recipeChangeEvent"
import { RecipeAction } from "../../app/models/recipeAction"

export class RecipeServiceMock {
  private recipes: Recipe[] = []

  _recipeChangeEvent: EventEmitter<RecipeChangeEvent> = new EventEmitter<RecipeChangeEvent>()

  get recipeChangeEvent(): EventEmitter<RecipeChangeEvent> {
    return this._recipeChangeEvent
  }

  public getRecipeCount() {
    return this.recipes.length
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeChangeEvent.emit({
      recipe,
      event: RecipeAction.ADD,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public removeRecipe(recipeId: number) {
    // Mock implementation
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public updateRecipe(id: number, recipe: Recipe) {
    // Mock implementation
  }

  public getAllRecipes() {
    return this.recipes
  }

  public getAllKnownCookbooks() {
    return []
  }

  public getAllKnownIngredients() {
    return []
  }

  public getAllKnownCategories() {
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initializeRecipeLibrary = (recipes: Recipe[]) => {
    // Mock implementation
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  importLibrary = (recipes: Recipe[]) => {
    // Mock implementation
  }
}
