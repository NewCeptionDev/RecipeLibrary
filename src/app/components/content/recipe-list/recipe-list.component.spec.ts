import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RecipeListComponent } from "./recipe-list.component"
import { SearchService } from "../../../services/search.service"
import { SortOptions } from "../../../models/sortOptions"
import { SortDirection } from "../../../models/sortDirection"
import { SearchServiceMock } from "../../../../tests/mocks/SearchServiceMock"
import { RecipeBuilder } from "../../../../tests/objects/RecipeBuilder"

describe("RecipeListComponent", () => {
  let component: RecipeListComponent
  let fixture: ComponentFixture<RecipeListComponent>
  let searchService: SearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      providers: [{ provide: SearchService, useClass: SearchServiceMock }],
    }).compileComponents()

    fixture = TestBed.createComponent(RecipeListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    searchService = TestBed.inject(SearchService)
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should expand recipe if selected given recipe was not selected before", () => {
    component.selectedRecipe = -1
    component.selectRecipe(1)
    expect(component.selectedRecipe).toBe(1)
  })

  it("should shrink recipe if selected given recipe was selected before", () => {
    component.selectedRecipe = 1
    component.selectRecipe(1)
    expect(component.selectedRecipe).toBe(-1)
  })

  it("should show amount of found recipes and sortFilters given search found results", () => {
    searchService.getSearchResultsEventEmitter().emit([RecipeBuilder.defaultRecipe()])
    fixture.detectChanges()
    const recipeList: HTMLElement = fixture.nativeElement
    const optionsRow = recipeList.querySelector(".optionRow")!
    expect(optionsRow).not.toBeNull()
  })

  it("should not show amount of found recipes or sortFilters given search found no results", () => {
    searchService.getSearchResultsEventEmitter().emit([])
    fixture.detectChanges()
    const recipeList: HTMLElement = fixture.nativeElement
    const optionsRow = recipeList.querySelector(".optionRow")!
    expect(optionsRow).toBeNull()
  })

  it("should show amount of found recipes without recipe plural given search found one result", () => {
    searchService.getSearchResultsEventEmitter().emit([RecipeBuilder.defaultRecipe()])
    fixture.detectChanges()
    const recipeList: HTMLElement = fixture.nativeElement
    const amountNote = recipeList.querySelector(".optionRow > p")!
    expect(amountNote.textContent).toBe("Found 1 Recipe")
  })

  it("should show amount of found recipes with recipe plural given search found two result", () => {
    searchService
      .getSearchResultsEventEmitter()
      .emit([RecipeBuilder.defaultRecipe(), RecipeBuilder.defaultRecipe()])
    fixture.detectChanges()
    const recipeList: HTMLElement = fixture.nativeElement
    const amountNote = recipeList.querySelector(".optionRow > p")!
    expect(amountNote.textContent).toBe("Found 2 Recipes")
  })

  it("should update sortOption when sortOptionAdjusted", () => {
    const adjustSortFiltersSpy = spyOn(searchService, "adjustSortFilter")
    const sortOption = SortOptions.RATING
    const direction = SortDirection.ASC

    component.sortOptionAdjusted(sortOption, direction)

    expect(component.currentSortOption).toBe(sortOption)
    expect(adjustSortFiltersSpy).toHaveBeenCalledWith(sortOption, direction)
  })
})
