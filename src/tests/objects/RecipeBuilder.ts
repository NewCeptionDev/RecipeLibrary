import { Recipe } from "../../app/models/recipe"

export class RecipeBuilder {
  private id: number = -1

  private recipeName: string = ""

  private cookbook: string = ""

  private ingredients: string[] = []

  private categories: string[] = []

  private rating: number = -1

  private requiredTime: number | undefined = undefined

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

  withRequiredTime = (requiredTime: number): RecipeBuilder => {
    this.requiredTime = requiredTime
    return this
  }

  build = (): Recipe => ({
    id: this.id,
    recipeName: this.recipeName,
    cookbook: this.cookbook,
    ingredients: this.ingredients,
    categories: this.categories,
    rating: this.rating,
    requiredTime: this.requiredTime,
  })

  defaultRecipe = (): RecipeBuilder =>
    new RecipeBuilder()
      .withId(1)
      .withRecipeName("Test Recipe")
      .withCookbook("Test Cookbook")
      .withIngredients(["Test Ingredient"])
      .withCategories(["Test Category"])
      .withRating(1)
      .withRequiredTime(30)

  static defaultRecipe = (): Recipe =>
    new RecipeBuilder()
      .withId(1)
      .withRecipeName("Test Recipe")
      .withCookbook("Test Cookbook")
      .withIngredients(["Test Ingredient"])
      .withCategories(["Test Category"])
      .withRating(1)
      .withRequiredTime(30)
      .build()

  static defaultRecipeWithoutId = (): Recipe =>
    new RecipeBuilder()
      .withRecipeName("Test Recipe")
      .withCookbook("Test Cookbook")
      .withIngredients(["Test Ingredient"])
      .withCategories(["Test Category"])
      .withRating(1)
      .withRequiredTime(30)
      .build()

  static e2eRecipe = (): Recipe =>
    new RecipeBuilder()
      .withRecipeName("Salami & Mushroom Pizza")
      .withCookbook("myrecipes.com")
      .withIngredients([
        "Pizza Dough",
        "Olive Oil",
        "Mushrooms",
        "Pizza Sauce",
        "Salami",
        "Mozzarella Cheese",
      ])
      .withCategories(["Meat", "Cheese", "Fast"])
      .withRating(3)
      .withRequiredTime(120)
      .build()

  static listOfRecipes = (): Recipe[] => [
    new RecipeBuilder()
      .withId(1)
      .withRecipeName("First Recipe")
      .withCookbook("Cookbook 1")
      .withCategories(["Vegetarian"])
      .withIngredients(["Paprika", "Tomato"])
      .withRating(1)
      .withRequiredTime(20)
      .build(),
    new RecipeBuilder()
      .withId(2)
      .withRecipeName("Second Recipe")
      .withCookbook("Cookbook 1")
      .withCategories(["Meat"])
      .withIngredients(["Sausage", "Tomato"])
      .withRating(2)
      .build(),
    new RecipeBuilder()
      .withId(3)
      .withRecipeName("Third Recipe")
      .withCookbook("Cookbook 2")
      .withCategories(["Vegan"])
      .withIngredients(["Salad", "Olives"])
      .withRating(3)
      .withRequiredTime(15)
      .build(),
    new RecipeBuilder()
      .withId(4)
      .withRecipeName("Fourth Recipe")
      .withCookbook("Cookbook 3")
      .withCategories(["Vegetarian"])
      .withIngredients(["Cheese", "Milk"])
      .withRating(4)
      .withRequiredTime(50)
      .build(),
  ]
}
