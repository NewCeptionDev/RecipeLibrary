import { ComponentFixture, TestBed } from "@angular/core/testing"

import { EditRecipesComponent } from "./edit-recipes.component"
import { RecipeService } from "../../../services/recipe.service"
import { DialogsService } from "../../../services/dialogs.service"
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table"
import { EventEmitter } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { RecipeServiceMock } from "../../../../tests/mocks/RecipeServiceMock"
import { DialogServiceMock } from "../../../../tests/mocks/DialogServiceMock"
import { RecipeBuilder } from "../../../../tests/objects/RecipeBuilder"
import { TestUtil } from "src/tests/testUtil"

describe("EditRecipesComponent", () => {
  let component: EditRecipesComponent
  let fixture: ComponentFixture<EditRecipesComponent>
  let recipeService: RecipeService
  let dialogService: DialogsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRecipesComponent],
      providers: [
        { provide: RecipeService, useClass: RecipeServiceMock },
        { provide: DialogsService, useClass: DialogServiceMock },
      ],
      imports: [MatTableModule, MatIconModule],
    }).compileComponents()

    fixture = TestBed.createComponent(EditRecipesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    recipeService = TestBed.inject(RecipeService)
    dialogService = TestBed.inject(DialogsService)
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should show no recipes note if no recipes were added", () => {
    component.recipes = []
    const editRecipes: HTMLElement = fixture.nativeElement
    const tableCell = editRecipes.querySelector(".mat-cell")!

    expect(tableCell.textContent!.trim()).toBe("No Recipes added yet")
  })

  it("should not show no recipes note if recipes were added", () => {
    recipeService.addRecipe(RecipeBuilder.defaultRecipe())
    const editRecipes: HTMLElement = fixture.nativeElement

    const reloadRecipesCaller: EventEmitter<void> = new EventEmitter()
    component.reloadRecipes = reloadRecipesCaller.asObservable()
    component.ngOnInit()
    reloadRecipesCaller.emit()
    fixture.detectChanges()

    // Get reference after changes were detected
    const tableCell = editRecipes.querySelector(".mat-cell")!

    expect(tableCell.textContent).not.toBe("No Recipes added yet")
  })

  it("should emit recipe on editRecipeTrigger", () => {
    let triggered = false
    component.editRecipe.subscribe((val) => {
      expect(val).toEqual(RecipeBuilder.defaultRecipe())
      triggered = true
    })

    component.editRecipeTrigger(RecipeBuilder.defaultRecipe())

    expect(triggered).toBeTrue()
  })

  it("should do nothing when onDeleteDialog given dialog returns false", () => {
    const openDialogSpy = spyOn(dialogService, "deleteRecipe").and.resolveTo(false)
    const recipeDeleteSpy = spyOn(recipeService, "removeRecipe")

    component.openDeleteDialog(RecipeBuilder.defaultRecipe())

    expect(openDialogSpy).toHaveBeenCalled()
    expect(recipeDeleteSpy).not.toHaveBeenCalled()
  })

  it("should call removeRecipe when onDeleteDialog given dialog returns true", async () => {
    const openDialogSpy = spyOn(dialogService, "deleteRecipe").and.resolveTo(true)
    const recipeDeleteSpy = spyOn(recipeService, "removeRecipe")

    await component.openDeleteDialog(RecipeBuilder.defaultRecipe())

    expect(openDialogSpy).toHaveBeenCalled()
    expect(recipeDeleteSpy).toHaveBeenCalled()
  })

  it("should call updateShownRecipes when searchTerm is updated", () => {
    // @ts-ignore
    const updateSpy = spyOn(component, "updateShownRecipes")

    const newSearchTerm = "NewValue"

    component.searchRecipeFormControl.setValue(newSearchTerm)

    expect(updateSpy).toHaveBeenCalled()
    // @ts-ignore
    expect(component.searchTerm).toBe(newSearchTerm)
  })

  it("should filter recipes for tableSource when searchTerm is not empty", () => {
    const recipes = RecipeBuilder.listOfRecipes()
    spyOn(recipeService, "getAllRecipes").and.returnValue(recipes)

    const usedSearchTerm = "First"

    // @ts-ignore
    component.searchTerm = usedSearchTerm

    TestUtil.tableDataSourceShouldBeUpdatedAndIncludeValue(
      component.tableDataSource.connect(),
      recipes.filter((recipe) => recipe.recipeName.includes(usedSearchTerm)),
      // @ts-ignore
      component.updateShownRecipes.bind(component)
    )
  })
})
