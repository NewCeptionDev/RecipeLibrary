import { Recipe } from "../../src/app/models/recipe"
import { RecipeBuilder } from "../../src/tests/objects/RecipeBuilder"
import { SearchOptions } from "../../src/app/models/searchOptions"
import { SearchOptionsBuilder } from "../../src/tests/objects/SearchOptionsBuilder"

beforeEach(() => {
  cy.visit("/")
  cy.contains("No Recipes found!")
})

describe("Add Recipe E2E", () => {
  it("should add a recipe", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.contains("Add a Recipe").should("not.exist")
    cy.get(".mat-snack-bar-container").contains("Recipe added")
    cy.contains("Found 1 recipe!")
  })

  it("should clear recipe from if add recipe was cancelled", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#cancelRecipeFormAction").click()
    cy.contains("Add a Recipe").should("not.exist")
    cy.contains("No Recipes found!")
    cy.get("#addSidebarButton").click()
    cy.get("#recipeName").should("have.value", "")
    cy.get("#cookbookSelect #autoCompleteInput").should("have.value", "")
    cy.get("#ingredientSelect #autoCompleteInput").should("have.value", "")
    cy.get("#ingredientSelect table").contains("No Ingredients added")
    cy.get("#categorySelect #autoCompleteInput").should("have.value", "")
    cy.get("#categorySelect table").contains("No Categories added")
    cy.get(".stars mat-icon").should("not.have.class", "filledStar")
    cy.get("#requiredTime").should("have.value", "")
    cy.get("#pageNumber").should("have.value", "")
  })

  it("should find recipe in edit / delete tab after adding", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.get("#editSidebarButton").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
  })

  it("should show cancel dialog if closing adding tab after adding any information", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#addSidebarButton").click()
    cy.get("app-two-button-dialog").contains("Discard Changes")
    cy.contains(
      "Closing this window will discard your changes. Are you sure that you want to close the window?"
    )
  })
})

describe("Delete Recipe E2E", () => {
  it("should delete recipe if confirmed", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.contains("Found 1 recipe!")
    cy.get("#editSidebarButton").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.get("#deleteRecipeButton").click()
    cy.get("app-two-button-dialog").contains("Delete recipe")
    cy.contains(
      `Are you sure that you want to delete Recipe ${
        RecipeBuilder.e2eRecipe().recipeName
      }? A deleted recipe cannot be recovered.`
    )
    cy.get("#dialogSubmitButton").click()
    cy.get("app-two-button-dialog").should("not.exist")
    cy.get(".mat-snack-bar-container").contains("Recipe removed")
    cy.contains("No Recipes added yet")
    cy.contains("No Recipes found!")
  })

  it("should not delete recipe if cancelled", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.contains("Found 1 recipe!")
    cy.get("#editSidebarButton").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.get("#deleteRecipeButton").click()
    cy.get("app-two-button-dialog").contains("Delete recipe")
    cy.contains(
      `Are you sure that you want to delete Recipe ${
        RecipeBuilder.e2eRecipe().recipeName
      }? A deleted recipe cannot be recovered.`
    )
    cy.get("#dialogCancelButton").click()
    cy.get("app-two-button-dialog").should("not.exist")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.contains("Found 1 recipe!")
  })
})

describe("Edit Recipe E2E", () => {
  it("should correctly show recipe in edit more after adding", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.contains("Found 1 recipe!")
    cy.get("#editSidebarButton").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.get("#editRecipeButton").click()
    validateRecipeFormElements(RecipeBuilder.e2eRecipe())
  })

  it("should update recipe when editing", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.contains("Found 1 recipe!")
    cy.get("#editSidebarButton").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.get("#editRecipeButton").click()
    cy.get("#recipeName").type(" Updated")
    cy.get("#cookbookSelect").type(" Updated{enter}")
    cy.get("#ingredientSelect #autoCompleteInput").type("Additional Ingredient{enter}")
    cy.get("#categorySelect #autoCompleteInput").type("Additional Category{enter}")
    cy.get(".stars span").eq(4).click()
    cy.get("#requiredTime").clear()
    cy.get("#requiredTime").type("20")
    cy.get("#pageNumber").clear()
    cy.get("#pageNumber").type("42")
    cy.get("#submitRecipeFormAction").click()
    cy.get(".mat-snack-bar-container").contains("Recipe changed")
    const updatedRecipe = RecipeBuilder.e2eRecipe()
    updatedRecipe.recipeName += " Updated"
    updatedRecipe.cookbook += " Updated"
    updatedRecipe.ingredients.push("Additional Ingredient")
    updatedRecipe.categories.push("Additional Category")
    updatedRecipe.rating = 5
    updatedRecipe.requiredTime = 20
    updatedRecipe.pageNumber = "42"
    cy.contains("Edit / Delete Recipes")
    cy.contains(updatedRecipe.recipeName)
    cy.get("#editRecipeButton").click()
    validateRecipeFormElements(updatedRecipe)
    cy.get("#recipeName").type(`${"{backspace}".repeat(8)}`)
    cy.get("#cookbookSelect").type(`${"{backspace}".repeat(8)}{enter}`)
    cy.get("#ingredientSelect table td.action").eq(0).click()
    cy.get("#categorySelect table td.action").eq(0).click()
    cy.get(".stars span")
      .eq(RecipeBuilder.e2eRecipe().rating - 1)
      .click()
    cy.get("#requiredTime").clear()
    cy.get("#requiredTime").type(120)
    cy.get("#pageNumber").clear()
    cy.get("#pageNumber").type("1")
    cy.get("#submitRecipeFormAction").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.get("#editRecipeButton").click()
    validateRecipeFormElements(RecipeBuilder.e2eRecipe())
  })

  it("should show cancel dialog if closing editing tab after changing recipe", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.get("#editSidebarButton").click()
    cy.contains("Edit / Delete Recipes")
    cy.get("#editRecipeButton").click()
    cy.get("#recipeName").type(" Updated")
    cy.get("#editSidebarButton").click()
    cy.get("app-two-button-dialog").contains("Discard Changes")
    cy.contains(
      "Closing this window will discard your changes. Are you sure that you want to close the window?"
    )
  })

  it("should show only recipes matching entered searchTerm", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    addRecipe(RecipeBuilder.defaultRecipeWithoutId())
    cy.get("#submitRecipeFormAction").click()
    cy.get("#editSidebarButton").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.contains(RecipeBuilder.defaultRecipeWithoutId().recipeName)
    cy.get("#recipeSearch").should("exist")
    cy.get("#recipeSearch").type("Salami")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.contains(RecipeBuilder.defaultRecipeWithoutId().recipeName).should("not.exist")
    cy.get("#recipeSearch").clear()
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.contains(RecipeBuilder.defaultRecipeWithoutId().recipeName)
  })
})

describe("Settings E2E", () => {
  it("should switch to settings tab", () => {
    cy.get("#settingsSidebarButton").click()
    cy.contains("Settings")
  })

  it("should have all optional features enabled by default", () => {
    cy.get("#settingsSidebarButton").click()
    cy.get(".settingContainer").eq(2).contains("Optional Recipe Features")
    cy.get(".settingContainer").eq(2).contains("Categories")
    cy.get(".settingContainer").eq(2).contains("Rating")
    cy.get(".settingContainer").eq(2).contains("Required Time")
    cy.get(".settingContainer").eq(2).contains("Page Numbers")
    cy.get(".mdc-switch")
    cy.get(".mdc-switch").each(($el) => {
      cy.wrap($el).should("have.attr", "aria-checked", "true")
    })
  })

  it("should contain all elements if features are enabled", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()

    cy.get("#searchSidebarButton").click()
    cy.contains("Minimum Rating")
    cy.contains("Maximum Required Time")
    cy.get("#categorySelect").should("exist")
    cy.get("#addSidebarButton").click()
    cy.contains("Rating")
    cy.contains("Required Time")
    cy.contains("Page Number")
    cy.get("#categorySelect").should("exist")
    cy.get("#editSidebarButton").click()
    cy.get("#editRecipeButton").click()
    cy.contains("Rating")
    cy.contains("Required Time")
    cy.contains("Page Number")
    cy.get("#categorySelect").should("exist")

    cy.get("#searchSidebarButton").click()
    cy.get("#submitSearchButton").click()
    cy.get("#ratingSorting").should("exist")
    cy.get("#requiredTimeSorting").should("exist")
    cy.contains("Rating")
    cy.contains("Required Time")
    cy.get("app-recipe-overview").click()
    cy.contains("Rating")
    cy.contains("Required Time")
    cy.contains("Page Number")
    cy.get("#categorySelect").should("exist")
  })

  it("should not show rating element if feature disabled", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()

    cy.get("#settingsSidebarButton").click()
    cy.get("#Rating").click()
    cy.get("#searchSidebarButton").click()
    cy.contains("Minimum Rating").should("not.exist")
    cy.get("#addSidebarButton").click()
    cy.contains("Rating").should("not.exist")
    cy.get("#editSidebarButton").click()
    cy.get("#editRecipeButton").click()
    cy.contains("Rating").should("not.exist")

    cy.get("#searchSidebarButton").click()
    cy.get("#submitSearchButton").click()
    cy.get("#ratingSorting").should("not.exist")
    cy.contains("Rating").should("not.exist")
    cy.get("app-recipe-overview").click()
    cy.contains("Rating").should("not.exist")
  })

  it("should not show required time element if feature disabled", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()

    cy.get("#settingsSidebarButton").click()
    cy.get("#RequiredTime").click()
    cy.get("#searchSidebarButton").click()
    cy.contains("Maximum Required Time").should("not.exist")
    cy.get("#addSidebarButton").click()
    cy.contains("Required Time").should("not.exist")
    cy.get("#editSidebarButton").click()
    cy.get("#editRecipeButton").click()
    cy.contains("Required Time").should("not.exist")

    cy.get("#searchSidebarButton").click()
    cy.get("#submitSearchButton").click()
    cy.get("#requiredTimeSorting").should("not.exist")
    cy.contains("Required Time").should("not.exist")
    cy.get("app-recipe-overview").click()
    cy.contains("Required Time").should("not.exist")
  })

  it("should not show category element if feature disabled", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()

    cy.get("#settingsSidebarButton").click()
    cy.get("#Categories").click()
    cy.get("#searchSidebarButton").click()
    cy.get("#categorySelect").should("not.exist")
    cy.get("#addSidebarButton").click()
    cy.get("#categorySelect").should("not.exist")
    cy.get("#editSidebarButton").click()
    cy.get("#editRecipeButton").click()
    cy.get("#categorySelect").should("not.exist")

    cy.get("#searchSidebarButton").click()
    cy.get("#submitSearchButton").click()
    cy.get("#categorySelect").should("not.exist")
    cy.get("app-recipe-overview").click()
    cy.get("#categorySelect").should("not.exist")
  })

  it("should not show page number element if feature disabled", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()

    cy.get("#settingsSidebarButton").click()
    cy.get("#PageNumbers").click()
    cy.get("#addSidebarButton").click()
    cy.get("#pageNumber").should("not.exist")
    cy.get("#editSidebarButton").click()
    cy.get("#editRecipeButton").click()
    cy.get("#pageNumber").should("not.exist")

    cy.get("#searchSidebarButton").click()
    cy.get("#submitSearchButton").click()
    cy.get("app-recipe-overview").click()
    cy.contains("Page Number").should("not.exist")
  })
})

describe("Search E2E", () => {
  const searchRecipe = new RecipeBuilder()
    .withRecipeName("Club Soda Waffles")
    .withCookbook("myrecipes")
    .withRating(1)
    .withRequiredTime(20)
    .withCategories(["Sweet", "Fast"])
    .withIngredients(["Biscuit Mix", "Vegetable Oil", "Eggs", "Club Soda"])
    .build()

  beforeEach(() => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    addRecipe(searchRecipe)
    cy.get("#submitRecipeFormAction").click()
  })

  it("should show results on basic search", () => {
    cy.get("#searchSidebarButton").click()
    cy.contains("Search")
    cy.get("#submitSearchButton").click()
    cy.contains("Found 2 Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.contains(searchRecipe.recipeName)
  })

  it("should show recipe details on selecting", () => {
    cy.get("#searchSidebarButton").click()
    cy.contains("Search")
    cy.get("#submitSearchButton").click()
    cy.get("app-recipe-overview").eq(0).click()
    cy.get("app-recipe-detail").contains("Ingredients")
    searchRecipe.ingredients.forEach((ingredient) => {
      cy.get("app-recipe-detail").contains(ingredient)
    })
    cy.get("app-recipe-detail").contains("Categories")
    searchRecipe.categories.forEach((category) => {
      cy.get("app-recipe-detail").contains(category)
    })
  })

  it("should show only recipe matching filter, filtered by ingredient", () => {
    const searchOptions = new SearchOptionsBuilder()
      .withRequiredIngredients([RecipeBuilder.e2eRecipe().ingredients[0]])
      .build()
    search(searchOptions)
    cy.contains("Found 1 Recipe")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
  })

  it("should show only recipe matching filter, filtered by category", () => {
    const searchOptions = new SearchOptionsBuilder()
      .withIncludedCategories([searchRecipe.categories[0]])
      .build()
    search(searchOptions)
    cy.contains("Found 1 Recipe")
    cy.contains(searchRecipe.recipeName)
  })

  it("should show only recipe matching filter, filtered by rating", () => {
    const searchOptions = new SearchOptionsBuilder()
      .withMinimumRating(RecipeBuilder.e2eRecipe().rating)
      .build()
    search(searchOptions)
    cy.contains("Found 1 Recipe")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
  })

  it("should show only recipe matching filter, filtered by required time", () => {
    const searchOptions = new SearchOptionsBuilder()
      .withMaximumRequiredTime(searchRecipe.requiredTime)
      .build()
    search(searchOptions)
    cy.contains("Found 1 Recipe")
    cy.contains(searchRecipe.recipeName)
  })

  it("should show only recipe matching filter, filtered by cookbook", () => {
    cy.get("#searchSidebarButton").click()
    cy.contains("Search")
    cy.get("#cookbookSelect table td.action").eq(0).click()
    cy.get("#submitSearchButton").click()
    cy.contains("Found 1 Recipe")
    // Expects e2eRecipe as the cookbook includes .com an is therefore sorted after the searchRecipe cookbook
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
  })

  it("should sort search results correctly", () => {
    cy.get("#searchSidebarButton").click()
    cy.contains("Search")
    cy.get("#submitSearchButton").click()
    cy.contains("Found 2 Recipes")
    // Should be sorted alphabetical ascending
    cy.get("app-recipe-overview").eq(0).contains(searchRecipe.recipeName)
    cy.get("app-recipe-overview").eq(1).contains(RecipeBuilder.e2eRecipe().recipeName)

    cy.get("#alphabetSorting").click()
    // Should be sorted alphabetical descending
    cy.get("app-recipe-overview").eq(0).contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.get("app-recipe-overview").eq(1).contains(searchRecipe.recipeName)

    cy.get("#ratingSorting").click()
    // Should be sorted rating ascending
    cy.get("app-recipe-overview").eq(0).contains(searchRecipe.recipeName)
    cy.get("app-recipe-overview").eq(1).contains(RecipeBuilder.e2eRecipe().recipeName)

    cy.get("#ratingSorting").click()
    // Should be sorted rating descending
    cy.get("app-recipe-overview").eq(0).contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.get("app-recipe-overview").eq(1).contains(searchRecipe.recipeName)

    cy.get("#requiredTimeSorting").click()
    // Should be sorted required time ascending
    cy.get("app-recipe-overview").eq(0).contains(searchRecipe.recipeName)
    cy.get("app-recipe-overview").eq(1).contains(RecipeBuilder.e2eRecipe().recipeName)

    cy.get("#requiredTimeSorting").click()
    // Should be sorted required time descending
    cy.get("app-recipe-overview").eq(0).contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.get("app-recipe-overview").eq(1).contains(searchRecipe.recipeName)
  })
})

const addRecipe = (recipe: Recipe) => {
  cy.get("#addSidebarButton").click()
  cy.contains("Add a Recipe")
  cy.get("#recipeName").type(recipe.recipeName)
  cy.get("#cookbookSelect #autoCompleteInput").type(`${recipe.cookbook}{enter}`)
  cy.get("#ingredientSelect #autoCompleteInput").type(
    `${recipe.ingredients.reduce(
      (previousValue, currentValue) => `${previousValue}{enter}${currentValue}`
    )}{enter}`
  )
  cy.get("#categorySelect #autoCompleteInput").type(
    `${recipe.categories.reduce(
      (previousValue, currentValue) => `${previousValue}{enter}${currentValue}`
    )}{enter}`
  )
  cy.get(".stars span")
    .eq(recipe.rating - 1)
    .click()
  cy.get("#requiredTime").type(recipe.requiredTime)
  if (recipe.pageNumber !== "") {
    cy.get("#pageNumber").type(recipe.pageNumber)
  }
}

const validateRecipeFormElements = (recipe: Recipe) => {
  cy.get("#recipeName").should("have.value", recipe.recipeName)
  cy.get("#cookbookSelect #autoCompleteInput").should("have.value", recipe.cookbook)
  cy.get("#ingredientSelect #autoCompleteInput").should("have.value", "")
  recipe.ingredients.forEach((ingredient) => {
    cy.get("#ingredientSelect table").contains(ingredient)
  })
  cy.get("#categorySelect #autoCompleteInput").should("have.value", "")
  recipe.categories.forEach((category) => {
    cy.get("#categorySelect table").contains(category)
  })
  for (let i = 0; i < 5; i++) {
    if (i < recipe.rating) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      cy.get(".stars span")
        .eq(i)
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        .within(() => {
          cy.get(".mat-icon").should("have.class", "filledStar")
        })
    } else {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      cy.get(".stars span")
        .eq(i)
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        .within(() => {
          cy.get(".mat-icon").should("not.have.class", "filledStar")
        })
    }
  }
  cy.get("#requiredTime").should("have.value", recipe.requiredTime?.toString())
  cy.get("#pageNumber").should("have.value", recipe.pageNumber)
}

const search = (searchOptions: SearchOptions) => {
  cy.get("#searchSidebarButton").click()
  cy.contains("Search")
  searchOptions.requiredIngredients.forEach((ingredient) => {
    cy.get("#ingredientSelect #autoCompleteInput").type(`${ingredient}{enter}`)
  })
  searchOptions.includedCategories.forEach((category) => {
    cy.get("#categorySelect #autoCompleteInput").type(`${category}{enter}`)
  })
  cy.get(".stars span")
    .eq(searchOptions.minimumRating - 1)
    .click()
  if (searchOptions.maximumRequiredTime) {
    cy.get("#requiredTime").type(searchOptions.maximumRequiredTime)
  }
  cy.get("#submitSearchButton").click()
}
