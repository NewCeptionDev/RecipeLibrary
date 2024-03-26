import { Recipe } from "../../src/app/models/recipe";
import { RecipeBuilder } from "../../src/tests/objects/RecipeBuilder";

beforeEach(() => {
  cy.visit("/")
})

describe('Add Recipe E2E', () => {
  it('should add a recipe', () => {
    cy.contains('No Recipes found!')
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.contains("Add a Recipe").should("not.exist")
    cy.get(".mat-snack-bar-container").contains("Recipe added")
    cy.contains("Found 1 recipe!")
  })

  it("should clear recipe from if add recipe was cancelled", () => {
    cy.contains('No Recipes found!')
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
    cy.get(".stars mat-icon").should("not.have.css", "filledStar")
  });

  it("should find recipe in edit / delete tab after adding", () => {
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.get("#editSidebarButton").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
  });
})

describe("Delete Recipe E2E", () => {
  it("should delete recipe if confirmed", () => {
    cy.contains('No Recipes found!')
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
    cy.contains('No Recipes found!')
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
    cy.contains('No Recipes found!')
    addRecipe(RecipeBuilder.e2eRecipe())
    cy.get("#submitRecipeFormAction").click()
    cy.contains("Found 1 recipe!")
    cy.get("#editSidebarButton").click()
    cy.contains("Edit / Delete Recipes")
    cy.contains(RecipeBuilder.e2eRecipe().recipeName)
    cy.get("#editRecipeButton").click()
    cy.get("#recipeName").should("have.value", RecipeBuilder.e2eRecipe().recipeName)
    cy.get("#cookbookSelect #autoCompleteInput").should("have.value", RecipeBuilder.e2eRecipe().cookbook)
    cy.get("#ingredientSelect #autoCompleteInput").should("have.value", "")
    cy.get("#ingredientSelect table").contains("No Ingredients added")
    cy.get("#categorySelect #autoCompleteInput").should("have.value", "")
    cy.get("#categorySelect table").contains("No Categories added")
    cy.get(".stars mat-icon").eq(RecipeBuilder.e2eRecipe().rating - 1).should("not.have.css", "filledStar")
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
