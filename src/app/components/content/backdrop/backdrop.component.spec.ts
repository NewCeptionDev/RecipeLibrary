import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BackdropComponent } from "./backdrop.component";
import { RecipeService } from "../../../services/recipe.service";
import { SearchService } from "../../../services/search.service";
import { EventEmitter } from "@angular/core";
import { Recipe } from "../../../models/recipe";
import { RecipeChangeEvent } from "../../../models/recipeChangeEvent";
import { MatIconModule } from "@angular/material/icon";
import { RecipeAction } from "../../../models/recipeAction";

const testRecipe: Recipe = {
  id: 1,
  recipeName: "Test Recipe",
  rating: 5,
  cookbook: "",
  categories: [],
  ingredients: []
}

class RecipeServiceMock {
  private recipes: Recipe[] = []

  private _recipeChangeEvent: EventEmitter<RecipeChangeEvent> =
    new EventEmitter<RecipeChangeEvent>()

  get recipeChangeEvent(): EventEmitter<RecipeChangeEvent> {
    return this._recipeChangeEvent
  }

  public getRecipeCount() {
    return this.recipes.length
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeChangeEvent.emit({
      recipe: recipe,
      event: RecipeAction.ADD
    })
  }
}

class SearchServiceMock {
  private publishSearchResults: EventEmitter<Recipe[]> = new EventEmitter<Recipe[]>()
  public getSearchResultsEventEmitter(): EventEmitter<Recipe[]> {
    return this.publishSearchResults
  }
}

describe("BackdropComponent", () => {
  let component: BackdropComponent
  let fixture: ComponentFixture<BackdropComponent>
  let recipeService: RecipeService
  let searchService: SearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackdropComponent],
      providers: [
        { provide: RecipeService, useClass: RecipeServiceMock },
        { provide: SearchService, useClass: SearchServiceMock }
      ],
      imports: [MatIconModule]
    }).compileComponents()

    fixture = TestBed.createComponent(BackdropComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    recipeService = TestBed.inject(RecipeService)
    searchService = TestBed.inject(SearchService)
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("Should show no recipes in file note given no recipes added", () => {
    const backdropElement: HTMLElement = fixture.nativeElement
    const note = backdropElement.querySelector("p")!
    expect(note).not.toBeNull()
    expect(note.textContent).toContain("No Recipes found!")
  })

  it("Should show amount of recipes found note without plural given one recipe added", () => {
    recipeService.addRecipe(testRecipe)
    const backdropElement: HTMLElement = fixture.nativeElement
    const note = backdropElement.querySelector("p")!
    expect(note).not.toBeNull()
    expect(note.textContent).toContain("Found 1 recipe!")
  })

  it("Should show amount of recipes found note with plural given two recipes added", () => {
    recipeService.addRecipe(testRecipe)
    recipeService.addRecipe(testRecipe)
    const backdropElement: HTMLElement = fixture.nativeElement
    const note = backdropElement.querySelector("p")!
    expect(note).not.toBeNull()
    expect(note.textContent).toContain("Found 2 recipes!")
  })

  it("Should show no results found note given search with no results", () => {
    recipeService.addRecipe(testRecipe)
    searchService.getSearchResultsEventEmitter().emit([])
    const backdropElement: HTMLElement = fixture.nativeElement
    const note = backdropElement.querySelector("p")!
    expect(note).not.toBeNull()
    expect(note.textContent).toContain("There were no results found for your search.")
  })

  it("Should show no note given search results", () => {
    searchService.getSearchResultsEventEmitter().emit([testRecipe])
    const backdropElement: HTMLElement = fixture.nativeElement
    const note = backdropElement.querySelector("p")!
    expect(note).toBeNull()
  })
})
