import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RecipeFormComponent } from "./recipe-form.component"
import { RecipeService } from "../../../services/recipe.service"
import { RecipeServiceMock } from "../../../../tests/mocks/RecipeServiceMock"
import { RecipeBuilder } from "../../../../tests/objects/RecipeBuilder"

describe("AddRecipeComponent", () => {
  let component: RecipeFormComponent
  let fixture: ComponentFixture<RecipeFormComponent>
  let recipeService: RecipeService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeFormComponent],
      providers: [{ provide: RecipeService, useClass: RecipeServiceMock }],
    }).compileComponents()

    fixture = TestBed.createComponent(RecipeFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    recipeService = TestBed.inject(RecipeService)
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should correctly update the rating", () => {
    component.recipe.rating = 0
    component.updateRating(4)

    expect(component.recipe.rating).toBe(4)
  })

  it("should update selectedIngredientsList", () => {
    const ingredientName = "TestIngredient"
    component.recipe.ingredients = []
    component.updateSelectedIngredients([ingredientName])

    expect(component.recipe.ingredients.length).toBe(1)
    expect(component.recipe.ingredients[0]).toBe(ingredientName)
  })

  it("should update selectedCategories", () => {
    const categoryName = "TestCategory"
    component.recipe.categories = []
    component.updateSelectedCategories([categoryName])

    expect(component.recipe.categories.length).toBe(1)
    expect(component.recipe.categories[0]).toBe(categoryName)
  })

  it("should update cookbookName", () => {
    const expectedName = "TestCookbook"
    component.recipe.cookbook = ""
    component.updateCookbookName(expectedName)

    expect(component.recipe.cookbook).toBe(expectedName)
  })

  it("should mark formControl as touched if invalid", () => {
    const recipeChangeEmitSpy = spyOn(component.recipeChange, "emit")
    expect(component.recipeFormControl.touched).toBe(false)
    component.recipeFormControl.setErrors({ incorrect: true })

    component.finalizeRecipe()

    expect(component.recipeFormControl.touched).toBe(true)
    expect(recipeChangeEmitSpy).not.toHaveBeenCalled()
  })

  it("should update Recipe if editing and provided recipeInput", () => {
    const recipeServiceUpdateRecipeSpy = spyOn(recipeService, "updateRecipe")
    const recipeChangeEmitSpy = spyOn(component.recipeChange, "emit")
    component.editing = true
    component.recipeInput = component.recipe
    component.recipeFormControl.setErrors(null)

    component.finalizeRecipe()

    expect(recipeServiceUpdateRecipeSpy).toHaveBeenCalled()
    expect(recipeChangeEmitSpy).toHaveBeenCalled()
  })

  it("should addRecipe if not editing", () => {
    const recipeServiceAddRecipeSpy = spyOn(recipeService, "addRecipe")
    const recipeChangeEmitSpy = spyOn(component.recipeChange, "emit")
    component.editing = false
    component.recipeInput = component.recipe
    component.recipeFormControl.setErrors(null)

    component.finalizeRecipe()
    expect(recipeServiceAddRecipeSpy).toHaveBeenCalled()
    expect(recipeChangeEmitSpy).toHaveBeenCalled()
  })

  it("should addRecipe if no recipeInput provided", () => {
    const recipeServiceAddRecipeSpy = spyOn(recipeService, "addRecipe")
    const recipeChangeEmitSpy = spyOn(component.recipeChange, "emit")
    component.editing = true
    component.recipeInput = undefined
    component.recipeFormControl.setErrors(null)

    component.finalizeRecipe()

    expect(recipeServiceAddRecipeSpy).toHaveBeenCalled()
    expect(recipeChangeEmitSpy).toHaveBeenCalled()
  })

  it("should return true if hasRecipeChanged with changed recipe", () => {
    const adjustedRecipe = structuredClone(component.defaultRecipe)
    adjustedRecipe.recipeName = "TestRecipe"

    component.recipe = adjustedRecipe

    expect(component.hasRecipeChanged()).toBe(true)
  })

  it("should return true if hasRecipeChanged with changed recipe and recipeInput", () => {
    const adjustedRecipe = structuredClone(component.defaultRecipe)
    adjustedRecipe.recipeName = "TestRecipe"

    component.recipe = adjustedRecipe
    component.recipeInput = component.defaultRecipe

    expect(component.hasRecipeChanged()).toBe(true)
  })

  it("should return false if hasRecipeChanged with equal recipe", () => {
    component.recipe = component.defaultRecipe

    expect(component.hasRecipeChanged()).toBe(false)
  })

  it("should return false if hasRecipeChanged with equal recipe and recipeInput", () => {
    component.recipe = component.defaultRecipe
    component.recipeInput = component.defaultRecipe

    expect(component.hasRecipeChanged()).toBe(false)
  })

  it("should have editing headline in html when editing", () => {
    component.editing = true
    const recipeForm: HTMLElement = fixture.nativeElement
    component.ngOnInit()
    fixture.detectChanges()

    const headline = recipeForm.querySelector("h1")!

    expect(headline.textContent).toBe("Edit Recipe")
  })

  it("should have new recipe headline in html when not editing", () => {
    component.editing = false
    const recipeForm: HTMLElement = fixture.nativeElement
    component.ngOnInit()
    fixture.detectChanges()

    const headline = recipeForm.querySelector("h1")!

    expect(headline.textContent).toBe("Add a Recipe")
  })

  it("should have validation error if recipe name field not filled", () => {
    component.recipeFormControl.setValue("")

    expect(component.recipeFormControl.getError("required")).toBeTrue()
  })

  it("should have no validation error if recipe name field filled", () => {
    component.recipeFormControl.setValue("RecipeName")

    expect(component.recipeFormControl.getError("required")).toBeNull()
  })

  it("should correctly initialize component if recipeInput is true", () => {
    component.recipeInput = RecipeBuilder.defaultRecipe()

    expect(component.editing).toBeFalse()

    component.ngOnInit()

    expect(component.editing).toBeTrue()
    expect(component.recipeInput).toBe(RecipeBuilder.defaultRecipe())
  })
})
