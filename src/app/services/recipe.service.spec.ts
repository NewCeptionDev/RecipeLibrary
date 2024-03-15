import { TestBed } from "@angular/core/testing"

import { RecipeService } from "./recipe.service"
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Recipe } from "../models/recipe";
import { SnackbarService } from "./snackbar.service";

class SnackbarServiceMock {
  libraryImportedFeedback = () => {}
  recipeAddedFeedback = () => {}
}

describe("RecipeService", () => {
  let service: RecipeService
  let snackBarService: SnackbarService

  const recipeList: Recipe[] = [
    {
      id: 1,
      recipeName: "First Recipe",
      cookbook: "Cookbook 1",
      categories: ["Vegetarian"],
      ingredients: ["Paprika", "Tomato"],
      rating: 1
    },
    {
      id: 2,
      recipeName: "Second Recipe",
      cookbook: "Cookbook 1",
      categories: ["Meat"],
      ingredients: ["Sausage", "Tomato"],
      rating: 1
    },
    {
      id: 3,
      recipeName: "Third Recipe",
      cookbook: "Cookbook 2",
      categories: ["Vegan"],
      ingredients: ["Salad", "Olives"],
      rating: 1
    },
    {
      id: 4,
      recipeName: "Fourth Recipe",
      cookbook: "Cookbook 3",
      categories: ["Vegetarian"],
      ingredients: ["Cheese", "Milk"],
      rating: 1
    }
  ]

  const cookBooks = ["Cookbook 1", "Cookbook 2", "Cookbook 3"]
  const categories = ["Vegetarian", "Meat", "Vegan"]
  const ingredients = ["Paprika", "Tomato", "Sausage", "Salad", "Olives", "Cheese", "Milk"]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: SnackbarService, useClass: SnackbarServiceMock}
      ],
      imports: [MatSnackBarModule]
    })
    service = TestBed.inject(RecipeService)
    snackBarService = TestBed.inject(SnackbarService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should return all cookbooks when getAllCookbooks", () => {
    const cookbooks = ["Cookbook 1", "Cookbook 2", "Cookbook 3"]
    // @ts-ignore
    service.knownCookbooks = cookbooks
    expect(service.getAllKnownCookbooks()).toBe(cookbooks)
  });

  it("should return all ingredients when getAllIngredients", () => {
    const ingredients = ["Paprika", "Olives", "Peperoni"]
    // @ts-ignore
    service.knownIngredients = ingredients
    expect(service.getAllKnownIngredients()).toBe(ingredients)
  });

  it("should return all categories when getAllCategories", () => {
    const categories = ["Vegan", "Vegetarian", "Low Carb", "Meat"]
    // @ts-ignore
    service.knownCategories = categories
    expect(service.getAllKnownCategories()).toBe(categories)
  });

  it("should add recipes correctly when initializeRecipeLibrary", () => {
    service.initializeRecipeLibrary(recipeList)
    // @ts-ignore
    expect(service.knownCategories).toEqual(categories)
    // @ts-ignore
    expect(service.knownIngredients).toEqual(ingredients)
    // @ts-ignore
    expect(service.knownCookbooks).toEqual(cookBooks)

    // @ts-ignore
    expect(service.recipes).toEqual(recipeList)
   // @ts-ignore
    expect(RecipeService.lastUsedRecipeId).toBe(4)
  });

  it("should add recipes correctly when importLibrary", () => {
    const libraryImportedFeedbackSpy = spyOn(snackBarService, "libraryImportedFeedback")
    service.importLibrary(recipeList)
    // @ts-ignore
    expect(service.knownCategories).toEqual(categories)
    // @ts-ignore
    expect(service.knownIngredients).toEqual(ingredients)
    // @ts-ignore
    expect(service.knownCookbooks).toEqual(cookBooks)

    // @ts-ignore
    expect(service.recipes).toEqual(recipeList)
    // @ts-ignore
    expect(RecipeService.lastUsedRecipeId).toBe(4)
    expect(libraryImportedFeedbackSpy).toHaveBeenCalled()
  });

  it("should correctly add recipe and update known when addRecipe", () => {
    const recipeAddedFeedbackSpy = spyOn(snackBarService, "recipeAddedFeedback")
    const recipe = recipeList[0]
    recipe.id = -1

    service.addRecipe(recipe)

    // @ts-ignore
    expect(service.recipes[0].recipeName).toBe(recipe.recipeName)
    // @ts-ignore
    expect(service.recipes[0].id).not.toBe(-1)
    // @ts-ignore
    expect(service.knownCookbooks).toEqual([recipe.cookbook])
    // @ts-ignore
    expect(service.knownIngredients).toEqual([...recipe.ingredients])
    // @ts-ignore
    expect(service.knownCategories).toEqual([...recipe.categories])
    expect(recipeAddedFeedbackSpy).toHaveBeenCalled()
  });

  it("should return all recipes when getAllRecipes", () => {
    // @ts-ignore
    service.recipes = recipeList
    expect(service.getAllRecipes()).toEqual(recipeList)
  });

  it("should return correct recipeCount when getRecipeCount", () => {
    expect(service.getRecipeCount()).toBe(0)
    // @ts-ignore
    service.recipes = recipeList
    expect(service.getRecipeCount()).toBe(recipeList.length)
  });

  // removeRecipe removes recipe, removes known if only use, calls snackbar & recipeChanged
  // updateRecipe correctly adds new to known and removes old from known, call snackbar & recipeChanged
})
