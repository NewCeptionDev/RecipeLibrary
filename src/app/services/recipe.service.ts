import { Injectable } from "@angular/core"
import { Recipe } from "../models/recipe"

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private static lastUsedRecipeId = 0

  private recipes: Recipe[] = [
    {
      id: 9990,
      recipeName: "Pizza",
      cookbook: "Kopf",
      ingredients: ["Teig", "Tomatensoße", "Streukäse", "Salami"],
      categories: ["Fleisch"],
      rating: 5,
    },
    {
      id: 9991,
      recipeName: "Nudelteig",
      cookbook: "Kopf",
      ingredients: ["Mehl", "Wasser", "Olivenöl", "Hefe"],
      categories: ["Vegetarisch"],
      rating: 2,
    },
  ]

  private knownCookbooks: string[] = []

  private knownIngredients: string[] = []

  private knownCategories: string[] = []

  constructor() {}

  public getAllKnownCookbooks(): string[] {
    return this.knownCookbooks
  }

  public getAllKnownIngredients(): string[] {
    return this.knownIngredients
  }

  public getAllKnownCategories(): string[] {
    return this.knownCategories
  }

  public addRecipe(recipe: Recipe) {
    if (recipe.id < 0) {
      recipe.id = RecipeService.getNextRecipeId()
    }

    this.recipes.push(recipe)
    this.updateKnown(recipe)
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

    for (const ingredient of removedRecipe.ingredients) {
      if (!this.recipes.some((recipe) => recipe.ingredients.includes(ingredient))) {
        this.knownIngredients.splice(this.knownIngredients.indexOf(ingredient), 1)
      }
    }

    for (const category of removedRecipe.categories) {
      if (!this.recipes.some((recipe) => recipe.categories.includes(category))) {
        this.knownCategories.splice(this.knownCategories.indexOf(category), 1)
      }
    }
  }

  public removeRecipe(recipeId: number) {
    const recipe = this.recipes.find((recipe) => recipe.id === recipeId)

    if (recipe) {
      this.recipes.splice(this.recipes.indexOf(recipe), 1)
      this.removeFromKnown(recipe)
    }
  }

  public getAllRecipes() {
    return [...this.recipes]
  }

  public updateRecipe(recipeId: number, newRecipe: Recipe) {
    const oldRecipe = this.recipes.find((recipe) => recipe.id === recipeId)

    if (oldRecipe) {
      const index = this.recipes.indexOf(oldRecipe)

      this.recipes.splice(index, 1, newRecipe)

      this.updateKnown(newRecipe)
      this.removeFromKnown(oldRecipe)
    }
  }

  static getNextRecipeId(): number {
    this.lastUsedRecipeId++

    return this.lastUsedRecipeId
  }
}
