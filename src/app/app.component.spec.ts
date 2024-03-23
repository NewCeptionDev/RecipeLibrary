import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ExtendedOption } from "./models/extendedOption";
import { DialogsService } from "./services/dialogs.service";
import { RecipeFormComponent } from "./components/sidebar/recipe-form/recipe-form.component";
import { Recipe } from "./models/recipe";
import any = jasmine.any;

class DialogServiceMock {
  discardNewRecipe = () => {}
}

describe("AppComponent", () => {
  let dialogService: DialogsService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, RecipeFormComponent],
      imports: [MatDialogModule, MatSnackBarModule],
      providers: [{provide: DialogsService, useClass: DialogServiceMock}]
    }).compileComponents()
    dialogService = TestBed.inject(DialogsService)
  })

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it("should have as title 'RecipeLibrary'", () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual("RecipeLibrary")
  })

  it("should close extensibleContainer correctly when closeExtensibleContainer given ExtendendOption.EDITRECIPE", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const toggleEditRecipesSpy = spyOn(component, "toggleEditRecipes")
    const toggleAddRecipesSpy = spyOn(component, "toggleAddRecipe")
    component.extended = ExtendedOption.EDITRECIPE

    await component.closeExtensibleContainer()

    expect(toggleEditRecipesSpy).toHaveBeenCalled()
    expect(toggleAddRecipesSpy).not.toHaveBeenCalledWith()
  });

  it("should close extensibleContainer correctly when closeExtensibleContainer given ExtendendOption.ADD", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const toggleEditRecipesSpy = spyOn(component, "toggleEditRecipes")
    const toggleAddRecipesSpy = spyOn(component, "toggleAddRecipe")
    component.extended = ExtendedOption.ADD

    await component.closeExtensibleContainer()

    expect(toggleEditRecipesSpy).not.toHaveBeenCalled()
    expect(toggleAddRecipesSpy).toHaveBeenCalledWith()
  });

  it("should close extensibleContainer correctly when closeExtensibleContainer", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const toggleEditRecipesSpy = spyOn(component, "toggleEditRecipes")
    const toggleAddRecipesSpy = spyOn(component, "toggleAddRecipe")
    component.extended = ExtendedOption.SEARCH

    await component.closeExtensibleContainer()

    expect(toggleEditRecipesSpy).not.toHaveBeenCalled()
    expect(toggleAddRecipesSpy).not.toHaveBeenCalledWith()
    // @ts-ignore
    expect(component.extended).toEqual(ExtendedOption.NONE)
  });

  it("should return correct boolean for show functions", () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    expect(component.showAddRecipe()).toBe(false)
    component.extended = ExtendedOption.ADD
    expect(component.showAddRecipe()).toBe(true)
    expect(component.showSettings()).toBe(false)
    component.extended = ExtendedOption.SETTINGS
    expect(component.showSettings()).toBe(true)
    expect(component.showEditRecipe()).toBe(false)
    component.extended = ExtendedOption.EDITRECIPE
    expect(component.showEditRecipe()).toBe(true)
    expect(component.showEditRecipes()).toBe(false)
    component.extended = ExtendedOption.EDIT
    expect(component.showEditRecipes()).toBe(true)
    expect(component.showSearch()).toBe(false)
    component.extended = ExtendedOption.SEARCH
    expect(component.showSearch()).toBe(true)
  });

  it("should correctly toggle search when toggleSearch", () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    expect(component.extended).toBe(ExtendedOption.NONE)
    component.toggleSearch()
    expect(component.extended).toBe(ExtendedOption.SEARCH)
    component.toggleSearch()
    expect(component.extended).toBe(ExtendedOption.NONE)
  });

  it("should correctly toggle search when toggleSettings", () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    expect(component.extended).toBe(ExtendedOption.NONE)
    component.toggleSettings()
    expect(component.extended).toBe(ExtendedOption.SETTINGS)
    component.toggleSettings()
    expect(component.extended).toBe(ExtendedOption.NONE)
  })

  it("should ask for confirmation on changes when viewSelected given ExtendedOption.ADD", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const recipeFormComponent = TestBed.createComponent(RecipeFormComponent).componentInstance
    component.recipeForm = recipeFormComponent
    const discardDialogSpy = spyOn(dialogService, "discardNewRecipe").and.resolveTo(false)
    const recipeFormSpy = spyOn(recipeFormComponent, "hasRecipeChanged").and.returnValue(true)
    component.extended = ExtendedOption.ADD
    await component.viewSelected(ExtendedOption.NONE)
    expect(discardDialogSpy).toHaveBeenCalled()
  });

  it("should ask for confirmation on changes when viewSelected given ExtendedOption.EDITRECIPE", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const recipeFormComponent = TestBed.createComponent(RecipeFormComponent).componentInstance
    component.recipeForm = recipeFormComponent
    const discardDialogSpy = spyOn(dialogService, "discardNewRecipe").and.resolveTo(true)
    const recipeFormSpy = spyOn(recipeFormComponent, "hasRecipeChanged").and.returnValue(true)
    component.extended = ExtendedOption.EDITRECIPE
    await component.viewSelected(ExtendedOption.NONE)
    expect(discardDialogSpy).toHaveBeenCalled()
  });

  it("should clear currentlyEditedRecipe when viewSelected", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const recipe: Recipe = {
      id: 1,
      recipeName: "Test Recipe",
      rating: 1,
      cookbook: "Test Cookbook",
      categories: [],
      ingredients: []
    }
    component.currentlyEditedRecipe = recipe

    await component.viewSelected(ExtendedOption.NONE)

    expect(component.currentlyEditedRecipe).toBeUndefined()
  });

  it("should set extended to none when viewSelected given view is already selected", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    component.extended = ExtendedOption.SETTINGS
    await component.viewSelected(ExtendedOption.SETTINGS)
    // @ts-ignore
    expect(component.extended).toBe(ExtendedOption.NONE)
  });

  it("should switch to new view when viewSelected", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    await component.viewSelected(ExtendedOption.SETTINGS)
    expect(component.extended).toBe(ExtendedOption.SETTINGS)
  });

  it("should switch to new view when viewSelected and no changes", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const recipeFormComponent = TestBed.createComponent(RecipeFormComponent).componentInstance
    component.recipeForm = recipeFormComponent
    component.extended = ExtendedOption.ADD
    const recipeFormSpy = spyOn(recipeFormComponent, "hasRecipeChanged").and.returnValue(false)
    await component.viewSelected(ExtendedOption.SETTINGS)
    // @ts-ignore
    expect(component.extended).toBe(ExtendedOption.SETTINGS)
  });

  it("should switch to new view with delay when viewSelected and newView ADD", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    await component.viewSelected(ExtendedOption.ADD)
    expect(component.extended).toBe(ExtendedOption.NONE)
    setTimeout(() => {
      expect(component.extended).toBe(ExtendedOption.ADD)
    }, 1)
  });

  it("should switch to new view with delay when viewSelected and newView EDITRECIPE", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    await component.viewSelected(ExtendedOption.EDITRECIPE)
    expect(component.extended).toBe(ExtendedOption.NONE)
    setTimeout(() => {
      expect(component.extended).toBe(ExtendedOption.EDITRECIPE)
    }, 1)
  });

  it("should correctly set currentlyEditedRecipe and switch to EDITRECIPE view when editRecipe", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const recipe: Recipe = {
      id: 1,
      recipeName: "Test Recipe",
      rating: 1,
      cookbook: "Test Cookbook",
      categories: [],
      ingredients: []
    }
    await component.editRecipe(recipe)
    expect(component.currentlyEditedRecipe).toBe(recipe)
    setTimeout(() => {
      expect(component.extended).toBe(ExtendedOption.EDITRECIPE)
    }, 1)
  });

  it("should switch to extended none when recipeChange given currentlyEditedRecipe is undefined", () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    component.currentlyEditedRecipe = undefined
    component.extended = ExtendedOption.ADD
    component.recipeChange()
    // @ts-ignore
    expect(component.extended).toBe(ExtendedOption.NONE)
  });

  it("should switch to edit when recipeChange given currentlyEditedRecipe is not undefined", () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    component.currentlyEditedRecipe = {
      id: 1,
      recipeName: "Test Recipe",
      rating: 1,
      cookbook: "Test Cookbook",
      categories: [],
      ingredients: []
    }
    component.extended = ExtendedOption.EDITRECIPE
    component.recipeChange()
    // @ts-ignore
    expect(component.extended).toBe(ExtendedOption.EDIT)
    expect(component.currentlyEditedRecipe).toBeUndefined()
  });

  it("should switch to extend none when toggleAddRecipe given no changes and current view is ADD", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const recipeFormComponent = TestBed.createComponent(RecipeFormComponent).componentInstance
    component.recipeForm = recipeFormComponent
    component.extended = ExtendedOption.ADD
    const recipeFormSpy = spyOn(recipeFormComponent, "hasRecipeChanged").and.returnValue(false)
    component.toggleAddRecipe()
    // @ts-ignore
    expect(component.extended).toBe(ExtendedOption.NONE)
  });

  it("should switch to extend none when toggleAddRecipe given changes and current view is ADD", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const recipeFormComponent = TestBed.createComponent(RecipeFormComponent).componentInstance
    component.recipeForm = recipeFormComponent
    component.extended = ExtendedOption.ADD
    const recipeFormSpy = spyOn(recipeFormComponent, "hasRecipeChanged").and.returnValue(true)
    const discardRecipeSpy = spyOn(dialogService, "discardNewRecipe").and.resolveTo(true)
    await component.toggleAddRecipe()
    // @ts-ignore
    expect(component.extended).toBe(ExtendedOption.NONE)
  });

  it("should do nothing when toggleAddRecipe given changes and current view is ADD and action is cancelled", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const recipeFormComponent = TestBed.createComponent(RecipeFormComponent).componentInstance
    component.recipeForm = recipeFormComponent
    component.extended = ExtendedOption.ADD
    const recipeFormSpy = spyOn(recipeFormComponent, "hasRecipeChanged").and.returnValue(true)
    const discardRecipeSpy = spyOn(dialogService, "discardNewRecipe").and.resolveTo(false)
    await component.toggleAddRecipe()
    // @ts-ignore
    expect(component.extended).toBe(ExtendedOption.ADD)
  });

  it("should switch to ADD view when toggleAddRecipe given current view is not ADD", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
   component.currentlyEditedRecipe = {
     id: 1,
     recipeName: "Test Recipe",
     rating: 1,
     cookbook: "Test Cookbook",
     categories: [],
     ingredients: []
   }
   component.extended = ExtendedOption.SEARCH
    await component.toggleAddRecipe()
    // @ts-ignore
    expect(component.extended).toBe(ExtendedOption.NONE)
    expect(component.currentlyEditedRecipe).toBeUndefined()
    setTimeout(() => {
      expect(component.extended).toBe(ExtendedOption.ADD)
    }, 1)
  });

  it("should switch view to EDIT when toggleEditRecipes given current view is not EDIT or EDITRECIPE", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    component.extended = ExtendedOption.SEARCH
    await component.toggleEditRecipes()
    // @ts-ignore
    expect(component.extended).toBe(ExtendedOption.EDIT)
  });

  it("should switch view to none when toggleEditRecipes given current view is EDIT", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    component.extended = ExtendedOption.EDIT
    component.currentlyEditedRecipe = {
      id: 1,
      recipeName: "Test Recipe",
      rating: 1,
      cookbook: "Test Cookbook",
      categories: [],
      ingredients: []
    }
    await component.toggleEditRecipes()
    // @ts-ignore
    expect(component.extended).toBe(ExtendedOption.NONE)
    expect(component.currentlyEditedRecipe).toBeUndefined()
  });

  it("should switch view to EDIT when toggleEditRecipes given no changes and current view is EDITRECIPE", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const recipeFormComponent = TestBed.createComponent(RecipeFormComponent).componentInstance
    component.recipeForm = recipeFormComponent
    component.extended = ExtendedOption.EDITRECIPE
    component.currentlyEditedRecipe = {
      id: 1,
      recipeName: "Test Recipe",
      rating: 1,
      cookbook: "Test Cookbook",
      categories: [],
      ingredients: []
    }
    const recipeFormSpy = spyOn(recipeFormComponent, "hasRecipeChanged").and.returnValue(false)
    const discardRecipeSpy = spyOn(dialogService, "discardNewRecipe")
    await component.toggleEditRecipes()
    expect(component.currentlyEditedRecipe).toBeUndefined()
    // @ts-ignore
    expect(component.extended).toBe(ExtendedOption.EDIT)
    expect(discardRecipeSpy).not.toHaveBeenCalled()
  });

  it("should switch view to EDIT when toggleEditRecipes given changes and current view is EDITRECIPE", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const recipeFormComponent = TestBed.createComponent(RecipeFormComponent).componentInstance
    component.recipeForm = recipeFormComponent
    component.extended = ExtendedOption.EDITRECIPE
    component.currentlyEditedRecipe = {
      id: 1,
      recipeName: "Test Recipe",
      rating: 1,
      cookbook: "Test Cookbook",
      categories: [],
      ingredients: []
    }
    const recipeFormSpy = spyOn(recipeFormComponent, "hasRecipeChanged").and.returnValue(true)
    const discardRecipeSpy = spyOn(dialogService, "discardNewRecipe").and.resolveTo(true)
    await component.toggleEditRecipes()
    expect(component.currentlyEditedRecipe).toBeUndefined()
    // @ts-ignore
    expect(component.extended).toBe(ExtendedOption.EDIT)
    expect(discardRecipeSpy).toHaveBeenCalled()
  });

  it("should do nothing when toggleEditRecipes given changes and current view is EDITRECIPE and action is cancelled", async () => {
    const component = TestBed.createComponent(AppComponent).componentInstance
    const recipeFormComponent = TestBed.createComponent(RecipeFormComponent).componentInstance
    component.recipeForm = recipeFormComponent
    component.extended = ExtendedOption.EDITRECIPE
    component.currentlyEditedRecipe = {
      id: 1,
      recipeName: "Test Recipe",
      rating: 1,
      cookbook: "Test Cookbook",
      categories: [],
      ingredients: []
    }
    const recipeFormSpy = spyOn(recipeFormComponent, "hasRecipeChanged").and.returnValue(true)
    const discardRecipeSpy = spyOn(dialogService, "discardNewRecipe").and.resolveTo(false)
    await component.toggleEditRecipes()
    expect(component.extended).toBe(ExtendedOption.EDITRECIPE)
    expect(component.currentlyEditedRecipe).not.toBeUndefined()
  });

  it("should add eventlistener to window", () => {
    const windowRequireSpy = spyOn(window, "addEventListener")
    const component = TestBed.createComponent(AppComponent).componentInstance
    expect(windowRequireSpy).toHaveBeenCalledWith("keydown", any(Function))
  });
})
