import { Recipe } from "../../app/models/recipe";

export class RecipeBuilder {
  private id: number = -1

  private recipeName: string = ""

  private cookbook: string = ""

  private ingredients: string[] = []

  private categories: string[] = []

  private rating: number = -1

  withId = (id: number): RecipeBuilder => {
    this.id = id
    return this
  }

  withRecipeName = (recipeName: string): RecipeBuilder => {
    this.recipeName = recipeName
    return this
  }

  withCookbook = (cookbook: string): RecipeBuilder => {
    this.cookbook = cookbook
    return this
  }

  withIngredients = (ingredients: string[]): RecipeBuilder => {
    this.ingredients = ingredients
    return this
  }

  withCategories = (categories: string[]): RecipeBuilder => {
    this.categories = categories
    return this
  }

  withRating = (rating: number): RecipeBuilder => {
    this.rating = rating
    return this
  }

  build = (): Recipe => ({
      id: this.id,
      recipeName: this.recipeName,
      cookbook: this.cookbook,
      ingredients: this.ingredients,
      categories: this.categories,
      rating: this.rating
  })

  static defaultRecipe = (): Recipe => new RecipeBuilder()
      .withId(1)
      .withRecipeName("Test Recipe")
      .withCookbook("Test Cookbook")
      .withIngredients(["Test Ingredient"])
      .withCategories(["Test Category"])
      .withRating(1)
      .build()

  static defaultRecipeWithoutId = (): Recipe => new RecipeBuilder()
    .withRecipeName("Test Recipe")
    .withCookbook("Test Cookbook")
    .withIngredients(["Test Ingredient"])
    .withCategories(["Test Category"])
    .withRating(1)
    .build()
}
