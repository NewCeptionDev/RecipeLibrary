import { ComponentFixture, TestBed } from "@angular/core/testing"

import { BackdropComponent } from "./backdrop.component"
import { RecipeService } from "../../../services/recipe.service"
import { SearchService } from "../../../services/search.service"
import { MatIconModule } from "@angular/material/icon"
import { RecipeServiceMock } from "../../../../tests/mocks/RecipeServiceMock"
import { SearchServiceMock } from "../../../../tests/mocks/SearchServiceMock"
import { RecipeBuilder } from "../../../../tests/objects/RecipeBuilder"

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
        { provide: SearchService, useClass: SearchServiceMock },
      ],
      imports: [MatIconModule],
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
    recipeService.addRecipe(RecipeBuilder.defaultRecipe())
    const backdropElement: HTMLElement = fixture.nativeElement
    const note = backdropElement.querySelector("p")!
    expect(note).not.toBeNull()
    expect(note.textContent).toContain("Found 1 recipe!")
  })

  it("Should show amount of recipes found note with plural given two recipes added", () => {
    recipeService.addRecipe(RecipeBuilder.defaultRecipeWithoutId())
    recipeService.addRecipe(RecipeBuilder.defaultRecipeWithoutId())
    const backdropElement: HTMLElement = fixture.nativeElement
    const note = backdropElement.querySelector("p")!
    expect(note).not.toBeNull()
    expect(note.textContent).toContain("Found 2 recipes!")
  })

  it("Should show no results found note given search with no results", () => {
    recipeService.addRecipe(RecipeBuilder.defaultRecipe())
    searchService.getSearchResultsEventEmitter().emit([])
    const backdropElement: HTMLElement = fixture.nativeElement
    const note = backdropElement.querySelector("p")!
    expect(note).not.toBeNull()
    expect(note.textContent).toContain("There were no results found for your search.")
  })

  it("Should show no note given search results", () => {
    searchService.getSearchResultsEventEmitter().emit([RecipeBuilder.defaultRecipe()])
    const backdropElement: HTMLElement = fixture.nativeElement
    const note = backdropElement.querySelector("p")!
    expect(note).toBeNull()
  })
})
