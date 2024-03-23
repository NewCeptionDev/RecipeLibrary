import { ComponentFixture, TestBed } from "@angular/core/testing"

import { EditRecipesComponent } from "./edit-recipes.component"
import { Recipe } from "../../../models/recipe"
import { RecipeService } from "../../../services/recipe.service"
import { DialogsService } from "../../../services/dialogs.service"
import { MatTableModule } from "@angular/material/table"
import { EventEmitter } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"

const testRecipe: Recipe = {
  id: 1,
  recipeName: "Test Recipe",
  rating: 5,
  cookbook: "",
  categories: [],
  ingredients: [],
}

class RecipeServiceMock {
  private recipes: Recipe[] = []

  public getAllRecipes() {
    return this.recipes
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
  }

  public removeRecipe(recipeId: number) {}
}

class DialogServiceMock {
  deleteRecipe = () => {}
}

const RECIPE: Recipe = {
  id: 1,
  recipeName: "Test Recipe",
  rating: 1,
  cookbook: "Test Cookbook",
  categories: [],
  ingredients: []
}

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
    recipeService.addRecipe(testRecipe)
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
    component.editRecipe.subscribe(val => {
      expect(val).toBe(RECIPE)
      triggered = true
    })

    component.editRecipeTrigger(RECIPE)

    expect(triggered).toBeTrue()
  });

  it("should do nothing when onDeleteDialog given dialog returns false", () => {
    const openDialogSpy = spyOn(dialogService, "deleteRecipe").and.resolveTo(false)
    const recipeDeleteSpy = spyOn(recipeService, "removeRecipe")

    component.openDeleteDialog(RECIPE)

    expect(openDialogSpy).toHaveBeenCalled()
    expect(recipeDeleteSpy).not.toHaveBeenCalled()
  });

  it("should call removeRecipe when onDeleteDialog given dialog returns true", async () => {
    const openDialogSpy = spyOn(dialogService, "deleteRecipe").and.resolveTo(true)
    const recipeDeleteSpy = spyOn(recipeService, "removeRecipe")

    await component.openDeleteDialog(RECIPE)

    expect(openDialogSpy).toHaveBeenCalled()
    expect(recipeDeleteSpy).toHaveBeenCalled()
  });
})
