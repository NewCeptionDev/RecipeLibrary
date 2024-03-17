import { TestBed } from "@angular/core/testing";

import { SearchService } from "./search.service";

import { SearchOptions } from "../models/searchOptions";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SortDirection } from "../models/sortDirection";
import { SortOptions } from "../models/sortOptions";
import { Recipe } from "../models/recipe";
import { RecipeService } from "./recipe.service";
import { EventEmitter } from "@angular/core";
import { RecipeAction } from "../models/recipeAction";

class RecipeServiceMock {
  recipeChangeEvent = new EventEmitter()
  getAllRecipes = (): Recipe[] => [
    {
      id: 1,
      recipeName: "First Recipe",
      cookbook: "Cookbook 1",
      categories: ["Vegetarian"],
      ingredients: ["Paprika", "Tomato"],
      rating: 1,
    },
    {
      id: 2,
      recipeName: "Second Recipe",
      cookbook: "Cookbook 1",
      categories: ["Meat"],
      ingredients: ["Sausage", "Tomato"],
      rating: 2,
    },
    {
      id: 3,
      recipeName: "Third Recipe",
      cookbook: "Cookbook 2",
      categories: ["Vegan"],
      ingredients: ["Salad", "Olives"],
      rating: 3,
    },
    {
      id: 4,
      recipeName: "Fourth Recipe",
      cookbook: "Cookbook 3",
      categories: ["Vegetarian"],
      ingredients: ["Cheese", "Milk"],
      rating: 4,
    },
  ]
}

describe("SearchService", () => {
  let service: SearchService
  let recipeService: RecipeService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [{provide: RecipeService, useClass: RecipeServiceMock}]
    })
    service = TestBed.inject(SearchService)
    recipeService = TestBed.inject(RecipeService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should call adjustSearchResultsIfNeeded when recipeChangeEvent", () => {
    const adjustSearchResultsSpy = spyOn(service, "adjustSearchResultsIfNeeded")
    recipeService.recipeChangeEvent.emit({recipe: undefined, event: RecipeAction.ADD})
    expect(adjustSearchResultsSpy).toHaveBeenCalled()
  });

  it("should return last search options when getLastSearchOptions", () => {
    const searchOptions: SearchOptions = {
      includedCookbooks: [],
      includedCategories: [],
      requiredIngredients: [],
      minimumRating: 3
    }
    // @ts-ignore
    service.lastSearchOptions = searchOptions;
    expect(service.getLastSearchOptions()).toEqual(searchOptions)
  })

  it("should do nothing if no lastSearchOptions when adjustSearchResult", () => {
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe(() => {
      resultReceived = true
    })
    service.adjustSearchResultsIfNeeded({recipe: undefined, event: RecipeAction.ADD})
    expect(resultReceived).toBeFalse()
  });

  it("should call search when adjustSearchResult without Recipe in event", () => {
    const searchSpy = spyOn(service, "search")
    // @ts-ignore
    service.lastSearchOptions = {
      minimumRating: 1,
      includedCategories: [],
      requiredIngredients: [],
      includedCookbooks: []
    }
    service.adjustSearchResultsIfNeeded({recipe: undefined, event: RecipeAction.ADD})
    expect(searchSpy).toHaveBeenCalled()
  });

  it("should add recipe to lastRecipesList when adjustSearchResult given recipe matches filter", () => {
    const searchOptions: SearchOptions = {
      minimumRating: 1,
      includedCategories: [],
      requiredIngredients: [],
      includedCookbooks: []
    }
    const recipeToAdd: Recipe = {
      id: 99,
      recipeName: "Added Recipe",
      rating: 2,
      ingredients: [],
      categories: [],
      cookbook: "Cookbook 5"
    }
    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults).not.toContain(recipeToAdd)
    service.adjustSearchResultsIfNeeded({recipe: recipeToAdd, event: RecipeAction.ADD})
    // @ts-ignore
    expect(service.lastSearchResults).toContain(recipeToAdd)
  })

  it("should do nothing when adjustSearchResult given add event and recipe does not match filter", () => {
    const searchOptions: SearchOptions = {
      minimumRating: 3,
      includedCategories: [],
      requiredIngredients: [],
      includedCookbooks: []
    }
    const recipeToAdd: Recipe = {
      id: 99,
      recipeName: "Added Recipe",
      rating: 2,
      ingredients: [],
      categories: [],
      cookbook: "Cookbook 5"
    }
    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults).not.toContain(recipeToAdd)
    service.adjustSearchResultsIfNeeded({recipe: recipeToAdd, event: RecipeAction.ADD})
    // @ts-ignore
    expect(service.lastSearchResults).not.toContain(recipeToAdd)
  })

  it("should replace recipe in lastSearchResults when adjustSearchResult given edit event and before and after recipe match filter", () => {
    const searchOptions: SearchOptions = {
      minimumRating: 1,
      includedCategories: [],
      requiredIngredients: [],
      includedCookbooks: []
    }
    const recipeToUpdate: Recipe = {
      id: 2,
      recipeName: "Updated Recipe",
      rating: 2,
      ingredients: [],
      categories: [],
      cookbook: "Cookbook 5"
    }
    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults.find(recipe => recipe.id === 2)?.recipeName).toBe("Second Recipe")
    service.adjustSearchResultsIfNeeded({recipe: recipeToUpdate, event: RecipeAction.EDIT})
    // @ts-ignore
    expect(service.lastSearchResults.find(recipe => recipe.id === 2)?.recipeName).toBe("Updated Recipe")
  })

  it("should remove recipe in lastSearchResults when adjustSearchResult given edit event and only before recipe match filter", () => {
    const searchOptions: SearchOptions = {
      minimumRating: 1,
      includedCategories: [],
      requiredIngredients: [],
      includedCookbooks: ["Cookbook 1"]
    }
    const recipeToUpdate: Recipe = {
      id: 2,
      recipeName: "Updated Recipe",
      rating: 2,
      ingredients: [],
      categories: [],
      cookbook: "Cookbook 5"
    }
    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults.find(recipe => recipe.id === 2)?.recipeName).toBe("Second Recipe")
    service.adjustSearchResultsIfNeeded({recipe: recipeToUpdate, event: RecipeAction.EDIT})
    // @ts-ignore
    expect(service.lastSearchResults.find(recipe => recipe.id === 2)).toBeUndefined()
  })

  it("should add recipe in lastSearchResults when adjustSearchResult given edit event and only after recipe match filter", () => {
    const searchOptions: SearchOptions = {
      minimumRating: 3,
      includedCategories: [],
      requiredIngredients: [],
      includedCookbooks: []
    }
    const recipeToUpdate: Recipe = {
      id: 2,
      recipeName: "Updated Recipe",
      rating: 4,
      ingredients: [],
      categories: [],
      cookbook: "Cookbook 5"
    }
    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults.find(recipe => recipe.id === 2)).toBeUndefined()
    service.adjustSearchResultsIfNeeded({recipe: recipeToUpdate, event: RecipeAction.EDIT})
    // @ts-ignore
    expect(service.lastSearchResults.find(recipe => recipe.id === 2)?.recipeName).toBe("Updated Recipe")
  })

  it("should do nothing when adjustSearchResult given edit event and recipe does not match filter", () => {
    const searchOptions: SearchOptions = {
      minimumRating: 3,
      includedCategories: [],
      requiredIngredients: [],
      includedCookbooks: []
    }
    const recipeToUpdate: Recipe = {
      id: 2,
      recipeName: "Updated Recipe",
      rating: 2,
      ingredients: [],
      categories: [],
      cookbook: "Cookbook 5"
    }
    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults.find(recipe => recipe.id === 2)).toBeUndefined()
    service.adjustSearchResultsIfNeeded({recipe: recipeToUpdate, event: RecipeAction.EDIT})
    // @ts-ignore
    expect(service.lastSearchResults.find(recipe => recipe.id === 2)).toBeUndefined()
  })

  it("should remove recipe in lastSearchResults when adjustSearchResult given delete event and recipe match filter", () => {
    const searchOptions: SearchOptions = {
      minimumRating: 1,
      includedCategories: [],
      requiredIngredients: [],
      includedCookbooks: []
    }
    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults.find(recipe => recipe.id === 2)).not.toBeUndefined()
    service.adjustSearchResultsIfNeeded({recipe: recipeService.getAllRecipes()[1], event: RecipeAction.DELETE})
    // @ts-ignore
    expect(service.lastSearchResults.find(recipe => recipe.id === 2)).toBeUndefined()
  })

  it("should do nothing when adjustSearchResult given delete event and recipe does not match filter", () => {
    const searchOptions: SearchOptions = {
      minimumRating: 3,
      includedCategories: [],
      requiredIngredients: [],
      includedCookbooks: []
    }
    service.search(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults.find(recipe => recipe.id === 2)).toBeUndefined()
    service.adjustSearchResultsIfNeeded({recipe: recipeService.getAllRecipes()[1], event: RecipeAction.DELETE})
    // @ts-ignore
    expect(service.lastSearchResults.find(recipe => recipe.id === 2)).toBeUndefined()
  })

  it("should return correctly filtered list when search by rating", () => {
    const searchOptions: SearchOptions = {
      includedCookbooks: [],
      includedCategories: [],
      requiredIngredients: [],
      minimumRating: 3
    }
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList.length).toBe(2)
      expect(resultList.every(result => result.rating >= 3)).toBeTrue()
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  });

  it("should return correctly filtered list when search by cookbook", () => {
    const searchOptions: SearchOptions = {
      includedCookbooks: ["Cookbook 1"],
      includedCategories: [],
      requiredIngredients: [],
      minimumRating: 1
    }
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList.length).toBe(2)
      expect(resultList.every(result => result.cookbook === "Cookbook 1")).toBeTrue()
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  });

  it("should return correctly filtered list when search by category", () => {
    const searchOptions: SearchOptions = {
      includedCookbooks: [],
      includedCategories: ["Vegetarian"],
      requiredIngredients: [],
      minimumRating: 1
    }
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList.length).toBe(2)
      expect(resultList.every(result => result.categories.some(category => category === "Vegetarian"))).toBeTrue()
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  });

  it("should return correctly filtered list when search by ingredients", () => {
    const searchOptions: SearchOptions = {
      includedCookbooks: [],
      includedCategories: [],
      requiredIngredients: ["Tomato"],
      minimumRating: 1
    }
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList.length).toBe(2)
      expect(resultList.every(result => result.ingredients.some(ingredient => ingredient === "Tomato"))).toBeTrue()
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  });

  it("should correctly update last used when search", () => {
    const searchOptions: SearchOptions = {
      includedCookbooks: [],
      includedCategories: [],
      requiredIngredients: ["Tomato"],
      minimumRating: 1,
      sortOption: SortOptions.RATING
    }
    // @ts-ignore
    expect(service.lastSearchResults).toHaveSize(0)
    service.search(searchOptions)
    expect(service.getLastSearchOptions()).toBe(searchOptions)
    // @ts-ignore
    expect(service.lastSearchResults).not.toHaveSize(0)
  });

  it("should return correctly sorted result list when search with sortOption Rating DESC", () => {
    const searchOptions: SearchOptions = {
      includedCookbooks: [],
      includedCategories: [],
      requiredIngredients: [],
      minimumRating: 1,
      sortOption: SortOptions.RATING,
      sortDirection: SortDirection.DESC
    }
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList).toEqual(recipeService.getAllRecipes().sort((a, b) => b.rating - a.rating))
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  });

  it("should return correctly sorted result list when search with sortOption Rating ASC", () => {
    const searchOptions: SearchOptions = {
      includedCookbooks: [],
      includedCategories: [],
      requiredIngredients: [],
      minimumRating: 1,
      sortOption: SortOptions.RATING,
      sortDirection: SortDirection.ASC
    }
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList).toEqual(recipeService.getAllRecipes().sort((a, b) => a.rating - b.rating))
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  });

  it("should return correctly sorted result list when search with sortOption Alphabet DESC", () => {
    const searchOptions: SearchOptions = {
      includedCookbooks: [],
      includedCategories: [],
      requiredIngredients: [],
      minimumRating: 1,
      sortOption: SortOptions.ALPHABET,
      sortDirection: SortDirection.DESC
    }
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList).toEqual(recipeService.getAllRecipes().sort((a, b) => (a.recipeName < b.recipeName) ? 1 : -1))
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  });

  it("should return correctly sorted result list when search with sortOption Alphabet ASC", () => {
    const searchOptions: SearchOptions = {
      includedCookbooks: [],
      includedCategories: [],
      requiredIngredients: [],
      minimumRating: 1,
      sortOption: SortOptions.ALPHABET,
      sortDirection: SortDirection.ASC
    }
    let resultReceived = false
    service.getSearchResultsEventEmitter().subscribe((resultList) => {
      resultReceived = true
      expect(resultList).toEqual(recipeService.getAllRecipes().sort((a, b) => (a.recipeName < b.recipeName) ? -1 : 1))
    })
    service.search(searchOptions)
    expect(resultReceived).toBeTrue()
  });

  it("should throw error when called without lastSearchOptions when adjustSortFilter", () => {
    expect(() => service.adjustSortFilter(SortOptions.RATING, SortDirection.DESC)).toThrowError("Should not be called without a previous search")
  });

  it("should adjust sortFilter when adjustSortFilter", () => {
    const searchSpy = spyOn(service, "search")
    // @ts-ignore
    service.lastSearchOptions = {
      minimumRating: 1,
      requiredIngredients: [],
      includedCategories: [],
      includedCookbooks: [],
      sortDirection: SortDirection.DESC,
      sortOption: SortOptions.RATING
    }

    service.adjustSortFilter(SortOptions.ALPHABET, SortDirection.ASC)

    expect(service.getLastSearchOptions()?.sortOption).toBe(SortOptions.ALPHABET)
    expect(service.getLastSearchOptions()?.sortDirection).toBe(SortDirection.ASC)
    expect(searchSpy).toHaveBeenCalled()
  });
})
