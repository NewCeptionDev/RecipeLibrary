import { TestBed } from "@angular/core/testing"

import { RecipeService } from "./recipe.service"
import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar"
import { Recipe } from "../models/recipe"
import { SnackbarService } from "./snackbar.service"
import { SnackbarServiceMock } from "../../tests/mocks/SnackbarServiceMock"
import { RecipeBuilder } from "../../tests/objects/RecipeBuilder"

describe("RecipeService", () => {
  let service: RecipeService
  let snackBarService: SnackbarService

  let recipeList: Recipe[] = []

  let cookBooks: string[]
  let categories: string[]
  let ingredients: string[]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SnackbarService, useClass: SnackbarServiceMock }],
      imports: [MatSnackBarModule],
    })
    service = TestBed.inject(RecipeService)
    // @ts-ignore
    RecipeService.lastUsedRecipeId = 0
    snackBarService = TestBed.inject(SnackbarService)

    recipeList = RecipeBuilder.listOfRecipes()
    cookBooks = [...new Set(recipeList.map((recipe) => recipe.cookbook))]
    categories = [...new Set(recipeList.flatMap((recipe) => recipe.categories))]
    ingredients = [...new Set(recipeList.flatMap((recipe) => recipe.ingredients))]
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should return all cookbooks when getAllCookbooks", () => {
    const cookbooks = ["Cookbook 1", "Cookbook 2", "Cookbook 3"]
    // @ts-ignore
    service.knownCookbooks = cookbooks
    expect(service.getAllKnownCookbooks()).toBe(cookbooks)
  })

  it("should return all ingredients when getAllIngredients", () => {
    const expectedIngredients = ["Paprika", "Olives", "Peperoni"]
    // @ts-ignore
    service.knownIngredients = expectedIngredients
    expect(service.getAllKnownIngredients()).toBe(expectedIngredients)
  })

  it("should return all categories when getAllCategories", () => {
    const expectedCategories = ["Vegan", "Vegetarian", "Low Carb", "Meat"]
    // @ts-ignore
    service.knownCategories = expectedCategories
    expect(service.getAllKnownCategories()).toBe(expectedCategories)
  })

  it("should add recipes correctly when initializeRecipeLibrary", () => {
    service.initializeRecipeLibrary([...recipeList])

    // then
    expectGetAllsToEqualDefinedLists()
    // @ts-ignore
    expect(RecipeService.lastUsedRecipeId).toBe(4)
  })

  it("should add recipes correctly when importLibrary", () => {
    const libraryImportedFeedbackSpy = spyOn(snackBarService, "libraryImportedFeedback")

    // when
    service.importLibrary([...recipeList])

    // then
    expectGetAllsToEqualDefinedLists()
    // @ts-ignore
    expect(RecipeService.lastUsedRecipeId).toBe(4)
    expect(libraryImportedFeedbackSpy).toHaveBeenCalled()
  })

  it("should correctly add recipe and update known when addRecipe", () => {
    const recipeAddedFeedbackSpy = spyOn(snackBarService, "recipeAddedFeedback")
    const recipe = recipeList[0]
    recipe.id = -1

    // when
    service.addRecipe(recipe)

    // then
    expect(service.getAllRecipes()[0].recipeName).toBe(recipe.recipeName)
    expect(service.getAllRecipes()[0].id).not.toBe(-1)
    expect(service.getAllKnownCookbooks()).toEqual([recipe.cookbook])
    expect(service.getAllKnownIngredients()).toEqual([...recipe.ingredients])
    expect(service.getAllKnownCategories()).toEqual([...recipe.categories])
    expect(recipeAddedFeedbackSpy).toHaveBeenCalled()
  })

  it("should return all recipes when getAllRecipes", () => {
    // @ts-ignore
    service.recipes = recipeList
    expect(service.getAllRecipes()).toEqual(recipeList)
  })

  it("should return correct recipeCount when getRecipeCount", () => {
    expect(service.getRecipeCount()).toBe(0)
    // @ts-ignore
    service.recipes = recipeList
    expect(service.getRecipeCount()).toBe(recipeList.length)
  })

  it("should correctly remove recipe and update known when removeRecipe", () => {
    const recipeRemovedFeedbackSpy = spyOn(snackBarService, "recipeRemovedFeedback")
    service.initializeRecipeLibrary([...recipeList])

    // when
    service.removeRecipe(1)

    // then
    expect(service.getAllRecipes().find((recipe) => recipe.id === 1)).toBeUndefined()
    // Cookbook 1 is still known due to recipe 2
    expect(service.getAllKnownCookbooks()).toContain("Cookbook 1")
    // Paprika is only known in recipe 1 and should therefore be removed
    expect(service.getAllKnownIngredients()).not.toContain("Paprika")
    // Tomato is still known in recipe 2 and should not be removed
    expect(service.getAllKnownIngredients()).toContain("Tomato")
    // Vegetarian is still known due to recipe 4 and should not be removed
    expect(service.getAllKnownCategories()).toContain("Vegetarian")

    service.removeRecipe(2)
    expect(service.getAllKnownCookbooks()).not.toContain("Cookbook 1")

    service.removeRecipe(4)
    expect(service.getAllKnownCategories()).not.toContain("Vegetarian")

    expect(recipeRemovedFeedbackSpy).toHaveBeenCalledTimes(3)
  })

  it("should correctly update recipe and update known when updateRecipe", () => {
    const recipeEditedFeedbackSpy = spyOn(snackBarService, "recipeEditedFeedback")
    const adjustedRecipe: Recipe = new RecipeBuilder()
      .withId(1)
      .withRecipeName("First Recipe Updated")
      .withCookbook("Cookbook 4")
      .withCategories(["Meat"])
      .withIngredients(["Pork"])
      .withRating(1)
      .build()

    service.initializeRecipeLibrary([...recipeList])

    // when
    service.updateRecipe(1, adjustedRecipe)

    // then
    expect(service.getAllRecipes()[0].recipeName).toBe("First Recipe Updated")
    expect(service.getAllKnownCookbooks()).toEqual([...cookBooks, "Cookbook 4"])
    expect(service.getAllKnownCategories()).toEqual(categories)
    expect(service.getAllKnownIngredients()).toEqual([...ingredients.slice(1), "Pork"])
    expect(recipeEditedFeedbackSpy).toHaveBeenCalled()
  })

  function expectGetAllsToEqualDefinedLists() {
    expect(service.getAllKnownCategories()).toEqual(categories)
    expect(service.getAllKnownIngredients()).toEqual(ingredients)
    expect(service.getAllKnownCookbooks()).toEqual(cookBooks)
    expect(service.getAllRecipes()).toEqual(recipeList)
  }
})
