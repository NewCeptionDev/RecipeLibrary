import { TestBed } from "@angular/core/testing"

import { SearchService } from "./search.service"

import { SearchOptions } from "../models/searchOptions"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { SortDirection } from "../models/sortDirection"
import { SortOptions } from "../models/sortOptions"
import { Recipe } from "../models/recipe"
import { RecipeService } from "./recipe.service"
import { RecipeAction } from "../models/recipeAction"
import { RecipeServiceMock } from "../../tests/mocks/RecipeServiceMock"
import { RecipeBuilder } from "../../tests/objects/RecipeBuilder"
import { SearchOptionsBuilder } from "../../tests/objects/SearchOptionsBuilder"

describe("SearchService", () => {
  let service: SearchService
  let recipeService: RecipeService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [{ provide: RecipeService, useClass: RecipeServiceMock }],
    })
    recipeService = TestBed.inject(RecipeService)
    // Override mock implementation
    spyOn(recipeService, "getAllRecipes").and.returnValue(RecipeBuilder.listOfRecipes())
    service = TestBed.inject(SearchService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should call adjustSearchResultsIfNeeded when recipeChangeEvent", () => {
    const adjustSearchResultsSpy = spyOn(service, "adjustSearchResultsIfNeeded")
    recipeService.getRecipeChangeEvent().emit({ recipe: undefined, event: RecipeAction.ADD })
    expect(adjustSearchResultsSpy).toHaveBeenCalled()
  })

  it("should return last search options when getLastSearchOptions", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder().withMinimumRating(3).build()
    // @ts-ignore
    service.lastSearchOptions = searchOptions
    expect(service.getLastSearchOptions()).toEqual(searchOptions)
  })

  it("should do nothing if no lastSearchOptions when adjustSearchResult", () => {
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe(() => {
      resultReceived = true
    })
    service.adjustSearchResultsIfNeeded({ recipe: undefined, event: RecipeAction.ADD })
    expect(resultReceived).toBeFalse()
  })

  it("should call search when adjustSearchResult without Recipe in event", () => {
    const searchSpy = spyOn(service, "search")
    // @ts-ignore
    service.lastSearchOptions = SearchOptionsBuilder.emptyOptions()
    service.adjustSearchResultsIfNeeded({ recipe: undefined, event: RecipeAction.ADD })
    expect(searchSpy).toHaveBeenCalled()
  })

  it("should add recipe to lastRecipesList when adjustSearchResult given recipe matches filter", () => {
    const searchOptions: SearchOptions = SearchOptionsBuilder.emptyOptions()
    const recipeToAdd: Recipe = new RecipeBuilder()
      .withId(99)
      .withRecipeName("Added Recipe")
      .withRating(2)
      .withCookbook("Cookbook 5")
      .build()
    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults).not.toContain(recipeToAdd)
    service.adjustSearchResultsIfNeeded({ recipe: recipeToAdd, event: RecipeAction.ADD })
    // @ts-ignore
    expect(service.lastSearchResults).toContain(recipeToAdd)
  })

  it("should do nothing when adjustSearchResult given add event and recipe does not match filter", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder().withMinimumRating(3).build()
    const recipeToAdd: Recipe = new RecipeBuilder()
      .withId(99)
      .withRecipeName("Added Recipe")
      .withRating(2)
      .withCookbook("Cookbook 5")
      .build()

    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults).not.toContain(recipeToAdd)
    service.adjustSearchResultsIfNeeded({ recipe: recipeToAdd, event: RecipeAction.ADD })
    // @ts-ignore
    expect(service.lastSearchResults).not.toContain(recipeToAdd)
  })

  it("should replace recipe in lastSearchResults when adjustSearchResult given edit event and before and after recipe match filter", () => {
    const searchOptions: SearchOptions = SearchOptionsBuilder.emptyOptions()
    const recipeToUpdate: Recipe = new RecipeBuilder()
      .withId(2)
      .withRecipeName("Updated Recipe")
      .withRating(2)
      .withCookbook("Cookbook 5")
      .build()

    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults.find((recipe) => recipe.id === 2)?.recipeName).toBe(
      "Second Recipe"
    )
    service.adjustSearchResultsIfNeeded({ recipe: recipeToUpdate, event: RecipeAction.EDIT })
    // @ts-ignore
    expect(service.lastSearchResults.find((recipe) => recipe.id === 2)?.recipeName).toBe(
      "Updated Recipe"
    )
  })

  it("should remove recipe in lastSearchResults when adjustSearchResult given edit event and only before recipe match filter", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder()
      .withIncludedCookbooks(["Cookbook 1"])
      .build()
    const recipeToUpdate: Recipe = new RecipeBuilder()
      .withId(2)
      .withRecipeName("Updated Recipe")
      .withRating(2)
      .withCookbook("Cookbook 5")
      .build()

    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults.find((recipe) => recipe.id === 2)?.recipeName).toBe(
      "Second Recipe"
    )
    service.adjustSearchResultsIfNeeded({ recipe: recipeToUpdate, event: RecipeAction.EDIT })
    // @ts-ignore
    expect(service.lastSearchResults.find((recipe) => recipe.id === 2)).toBeUndefined()
  })

  it("should add recipe in lastSearchResults when adjustSearchResult given edit event and only after recipe match filter", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder().withMinimumRating(3).build()
    const recipeToUpdate: Recipe = new RecipeBuilder()
      .withId(2)
      .withRecipeName("Updated Recipe")
      .withRating(4)
      .withCookbook("Cookbook 5")
      .build()

    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults.find((recipe) => recipe.id === 2)).toBeUndefined()
    service.adjustSearchResultsIfNeeded({ recipe: recipeToUpdate, event: RecipeAction.EDIT })
    // @ts-ignore
    expect(service.lastSearchResults.find((recipe) => recipe.id === 2)?.recipeName).toBe(
      "Updated Recipe"
    )
  })

  it("should do nothing when adjustSearchResult given edit event and recipe does not match filter", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder().withMinimumRating(3).build()
    const recipeToUpdate: Recipe = new RecipeBuilder()
      .withId(2)
      .withRecipeName("Updated Recipe")
      .withRating(2)
      .withCookbook("Cookbook 5")
      .build()

    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults.find((recipe) => recipe.id === 2)).toBeUndefined()
    service.adjustSearchResultsIfNeeded({ recipe: recipeToUpdate, event: RecipeAction.EDIT })
    // @ts-ignore
    expect(service.lastSearchResults.find((recipe) => recipe.id === 2)).toBeUndefined()
  })

  it("should remove recipe in lastSearchResults when adjustSearchResult given delete event and recipe match filter", () => {
    const searchOptions: SearchOptions = SearchOptionsBuilder.emptyOptions()
    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults.find((recipe) => recipe.id === 2)).not.toBeUndefined()
    service.adjustSearchResultsIfNeeded({
      recipe: recipeService.getAllRecipes()[1],
      event: RecipeAction.DELETE,
    })
    // @ts-ignore
    expect(service.lastSearchResults.find((recipe) => recipe.id === 2)).toBeUndefined()
  })

  it("should do nothing when adjustSearchResult given delete event and recipe does not match filter", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder().withMinimumRating(3).build()
    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults.find((recipe) => recipe.id === 2)).toBeUndefined()
    service.adjustSearchResultsIfNeeded({
      recipe: recipeService.getAllRecipes()[1],
      event: RecipeAction.DELETE,
    })
    // @ts-ignore
    expect(service.lastSearchResults.find((recipe) => recipe.id === 2)).toBeUndefined()
  })

  it("should return correctly filtered list when search by rating", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder().withMinimumRating(3).build()
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList.length).toBe(2)
      expect(resultList.every((result) => result.rating >= 3)).toBeTrue()
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  })

  it("should return correctly filtered list when search by cookbook", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder()
      .withIncludedCookbooks(["Cookbook 1"])
      .build()
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList.length).toBe(2)
      expect(resultList.every((result) => result.cookbook === "Cookbook 1")).toBeTrue()
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  })

  it("should return correctly filtered list when search by category", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder()
      .withIncludedCategories(["Vegetarian"])
      .build()
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList.length).toBe(2)
      expect(
        resultList.every((result) =>
          result.categories.some((category) => category === "Vegetarian")
        )
      ).toBeTrue()
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  })

  it("should return correctly filtered list when search by ingredients", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder()
      .withRequiredIngredients(["Tomato"])
      .build()
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList.length).toBe(2)
      expect(
        resultList.every((result) =>
          result.ingredients.some((ingredient) => ingredient === "Tomato")
        )
      ).toBeTrue()
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  })

  it("should correctly update last used when search", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder()
      .withRequiredIngredients(["Tomato"])
      .withSortOption(SortOptions.RATING)
      .build()
    // @ts-ignore
    expect(service.lastSearchResults).toHaveSize(0)
    service.search(searchOptions)
    expect(service.getLastSearchOptions()).toBe(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults).not.toHaveSize(0)
  })

  it("should return correctly sorted result list when search with sortOption Rating DESC", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder()
      .withSortOption(SortOptions.RATING)
      .withSortDirection(SortDirection.DESC)
      .build()
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList).toEqual(recipeService.getAllRecipes().sort((a, b) => b.rating - a.rating))
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  })

  it("should return correctly sorted result list when search with sortOption Rating ASC", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder()
      .withSortOption(SortOptions.RATING)
      .withSortDirection(SortDirection.ASC)
      .build()
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList).toEqual(recipeService.getAllRecipes().sort((a, b) => a.rating - b.rating))
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  })

  it("should return correctly sorted result list when search with sortOption Alphabet DESC", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder()
      .withSortOption(SortOptions.ALPHABET)
      .withSortDirection(SortDirection.DESC)
      .build()
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList).toEqual(
        recipeService.getAllRecipes().sort((a, b) => (a.recipeName < b.recipeName ? 1 : -1))
      )
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  })

  it("should return correctly sorted result list when search with sortOption Alphabet ASC", () => {
    const searchOptions: SearchOptions = new SearchOptionsBuilder()
      .withSortOption(SortOptions.ALPHABET)
      .withSortDirection(SortDirection.ASC)
      .build()
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList).toEqual(
        recipeService.getAllRecipes().sort((a, b) => (a.recipeName < b.recipeName ? -1 : 1))
      )
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  })

  it("should throw error when called without lastSearchOptions when adjustSortFilter", () => {
    expect(() => service.adjustSortFilter(SortOptions.RATING, SortDirection.DESC)).toThrowError(
      "Should not be called without a previous search"
    )
  })

  it("should adjust sortFilter when adjustSortFilter", () => {
    const searchSpy = spyOn(service, "search")
    // @ts-ignore
    service.lastSearchOptions = new SearchOptionsBuilder()
      .withSortOption(SortOptions.RATING)
      .withSortDirection(SortDirection.DESC)
      .build()

    service.adjustSortFilter(SortOptions.ALPHABET, SortDirection.ASC)

    expect(service.getLastSearchOptions()?.sortOption).toBe(SortOptions.ALPHABET)
    expect(service.getLastSearchOptions()?.sortDirection).toBe(SortDirection.ASC)
    expect(searchSpy).toHaveBeenCalled()
  })
})
