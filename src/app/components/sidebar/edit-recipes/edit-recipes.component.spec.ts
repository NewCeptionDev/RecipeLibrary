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
}

class DialogServiceMock {}

describe("EditRecipesComponent", () => {
  let component: EditRecipesComponent
  let fixture: ComponentFixture<EditRecipesComponent>
  let recipeService: RecipeService

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
})
