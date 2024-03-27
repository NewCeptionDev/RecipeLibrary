import { Recipe } from "../../src/app/models/recipe";
import { RecipeBuilder } from "../../src/tests/objects/RecipeBuilder";

beforeEach(() => {
  cy.visit("/")
  cy.contains('No Recipes found!')
})

describe.skip('Add Recipe E2E', () => {
  it('should add a recipe', () => {
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
    cy.contains('No Recipes found!')
    cy.get("#addSidebarButton").click()
    cy.get("#recipeName").should("have.value", "")
    cy.get("#cookbookSelect #autoCompleteInput").should("have.value", "")
    cy.get("#ingredientSelect #autoCompleteInput").should("have.value", "")
    cy.get("#ingredientSelect table").contains("No Ingredients added")
    cy.get("#categorySelect #autoCompleteInput").should("have.value", "")
    cy.get("#categorySelect table").contains("No Categories added")
    cy.get(".stars mat-icon").should("not.have.class", "filledStar")
  });

  it("should find recipe in edit / delete tab after adding", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.get("#editSidebarButton").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
  });
})

describe.skip("Delete Recipe E2E", () => {
  it("should delete recipe if confirmed", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.contains("Found 1 recipe!")
    cy.get("#editSidebarButton").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.get("#deleteRecipeButton").click()
    cy.get("app-two-button-dialog").contains("Delete recipe")
    cy.contains(`Are you sure that you want to delete Recipe ${RecipeBuilder.e2eRecipe().recipeName}? A deleted recipe cannot be recovered.`)
    cy.get("#dialogSubmitButton").click()
    cy.get("app-two-button-dialog").should("not.exist")
    cy.get(".mat-snack-bar-container").contains("Recipe removed")
    cy.contains("No Recipes added yet")
    cy.contains('No Recipes found!')
  });

  it("should not delete recipe if cancelled", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.contains("Found 1 recipe!")
    cy.get("#editSidebarButton").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.get("#deleteRecipeButton").click()
    cy.get("app-two-button-dialog").contains("Delete recipe")
    cy.contains(`Are you sure that you want to delete Recipe ${RecipeBuilder.e2eRecipe().recipeName}? A deleted recipe cannot be recovered.`)
    cy.get("#dialogCancelButton").click()
    cy.get("app-two-button-dialog").should("not.exist")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.contains("Found 1 recipe!")
  });
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
  });

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
    cy.get("#submitRecipeFormAction").click()
    cy.get(".mat-snack-bar-container").contains("Recipe changed")
    const updatedRecipe = RecipeBuilder.e2eRecipe()
    updatedRecipe.recipeName += " Updated"
    updatedRecipe.cookbook += " Updated"
    updatedRecipe.ingredients.push("Additional Ingredient")
    updatedRecipe.categories.push("Additional Category")
    updatedRecipe.rating = 5
    cy.contains("Edit / Delete Recipes")
    cy.contains(updatedRecipe.recipeName)
    cy.get("#editRecipeButton").click()
    validateRecipeFormElements(updatedRecipe)
    cy.get("#recipeName").type(`${'{backspace}'.repeat(8)}`)
    cy.get("#cookbookSelect").type(`${'{backspace}'.repeat(8)}{enter}`)
    cy.get("#ingredientSelect table td.action").eq(0).click()
    cy.get("#categorySelect table td.action").eq(0).click()
    cy.get(".stars span").eq(RecipeBuilder.e2eRecipe().rating - 1).click()
    cy.get("#submitRecipeFormAction").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.get("#editRecipeButton").click()
    validateRecipeFormElements(RecipeBuilder.e2eRecipe())
  });
})

const addRecipe = (recipe: Recipe) => {
  cy.get("#addSidebarButton").click()
  cy.contains("Add a Recipe")
  cy.get("#recipeName").type(recipe.recipeName)
  cy.get("#cookbookSelect #autoCompleteInput").type(`${recipe.cookbook}{enter}`)
  cy.get("#ingredientSelect #autoCompleteInput").type(`${recipe.ingredients.reduce((previousValue, currentValue) => `${previousValue}{enter}${currentValue}`)}{enter}`)
  cy.get("#categorySelect #autoCompleteInput").type(`${recipe.categories.reduce((previousValue, currentValue) => `${previousValue}{enter}${currentValue}`)}{enter}`)
  cy.get(".stars span").eq(recipe.rating - 1).click()
}

const validateRecipeFormElements = (recipe: Recipe) => {
  cy.get("#recipeName").should("have.value", recipe.recipeName)
  cy.get("#cookbookSelect #autoCompleteInput").should("have.value", recipe.cookbook)
  cy.get("#ingredientSelect #autoCompleteInput").should("have.value", "")
  recipe.ingredients.forEach(ingredient => {
    cy.get("#ingredientSelect table").contains(ingredient)
  })
  cy.get("#categorySelect #autoCompleteInput").should("have.value", "")
  recipe.categories.forEach(category => {
    cy.get("#categorySelect table").contains(category)
  })
  for (let i = 0; i < 5; i++) {
    if(i < recipe.rating) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      cy.get(".stars span").eq(i).within(() => {
        cy.get(".mat-icon").should("have.class", "filledStar")
      })
    } else {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      cy.get(".stars span").eq(i).within(() => {
        cy.get(".mat-icon").should("not.have.class", "filledStar")
      })
    }
  }
}
