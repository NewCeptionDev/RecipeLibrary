import { Recipe } from "./recipe";

describe("Recipe Model", () => {
  let recipe1: Recipe
  let recipe2: Recipe

  beforeEach(() => {
  recipe1 = {
      id: 1,
      recipeName: "Test Recipe",
      cookbook: "Test",
      ingredients: ["TestIngredient"],
      categories: ["TestCategory"],
      rating: 1
    }
    recipe2 = {
      id: 1,
      recipeName: "Test Recipe",
      cookbook: "Test",
      ingredients: ["TestIngredient"],
      categories: ["TestCategory"],
      rating: 1
    }
  })

  it("should return true when equals", () => {
    expect(Recipe.equals(recipe1, recipe2)).toBeTrue()
  })

  it("should return false when equals given id is not equal", () => {
    recipe2.id = 2
    expect(Recipe.equals(recipe1, recipe2)).toBeFalse()
  });

  it("should return false when equals given recipeName is not equal", () => {
    recipe2.recipeName = "Another Test Recipe"
    expect(Recipe.equals(recipe1, recipe2)).toBeFalse()
  });

  it("should return false when equals given cookbook is not equal", () => {
    recipe2.cookbook = "Another Cookbook"
    expect(Recipe.equals(recipe1, recipe2)).toBeFalse()
  });

  it("should return false when equals given ingredients are not equal", () => {
    recipe2.ingredients = ["AnotherTestIngredient"]
    expect(Recipe.equals(recipe1, recipe2)).toBeFalse()
  });

  it("should return false when equals given categories are not equal", () => {
    recipe2.categories = ["AnotherTestCategory"]
    expect(Recipe.equals(recipe1, recipe2)).toBeFalse()
  });

  it("should return false when equals given rating is not equal", () => {
    recipe2.rating = 2
    expect(Recipe.equals(recipe1, recipe2)).toBeFalse()
  });
})
