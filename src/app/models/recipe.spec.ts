import { Recipe } from "./recipe"
import { RecipeBuilder } from "../../tests/objects/RecipeBuilder"

describe("Recipe Model", () => {
  it("should return true when equals", () => {
    expect(Recipe.equals(RecipeBuilder.defaultRecipe(), RecipeBuilder.defaultRecipe())).toBeTrue()
  })

  it("should return false when equals given id is not equal", () => {
    expect(
      Recipe.equals(
        RecipeBuilder.defaultRecipe(),
        new RecipeBuilder().defaultRecipe().withId(2).build()
      )
    ).toBeFalse()
  })

  it("should return false when equals given recipeName is not equal", () => {
    expect(
      Recipe.equals(
        RecipeBuilder.defaultRecipe(),
        new RecipeBuilder().defaultRecipe().withRecipeName("Another Test Recipe").build()
      )
    ).toBeFalse()
  })

  it("should return false when equals given cookbook is not equal", () => {
    expect(
      Recipe.equals(
        RecipeBuilder.defaultRecipe(),
        new RecipeBuilder().defaultRecipe().withCookbook("Another Cookbook").build()
      )
    ).toBeFalse()
  })

  it("should return false when equals given ingredients are not equal", () => {
    expect(
      Recipe.equals(
        RecipeBuilder.defaultRecipe(),
        new RecipeBuilder().defaultRecipe().withIngredients(["AnotherTestIngredient"]).build()
      )
    ).toBeFalse()
  })

  it("should return false when equals given categories are not equal", () => {
    expect(
      Recipe.equals(
        RecipeBuilder.defaultRecipe(),
        new RecipeBuilder().defaultRecipe().withCategories(["AnotherTestCategory"]).build()
      )
    ).toBeFalse()
  })

  it("should return false when equals given rating is not equal", () => {
    expect(
      Recipe.equals(
        RecipeBuilder.defaultRecipe(),
        new RecipeBuilder().defaultRecipe().withRating(2).build()
      )
    ).toBeFalse()
  })
})
