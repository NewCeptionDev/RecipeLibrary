import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SearchComponent } from "./search.component"
import { SearchService } from "../../../services/search.service"
import { Recipe } from "../../../models/recipe"
import { RecipeService } from "../../../services/recipe.service"
import { SearchOptions } from "../../../models/searchOptions"
import { SortOptions } from "../../../models/sortOptions"
import { SortDirection } from "../../../models/sortDirection"

class SearchServiceMock {
  public search(options: never) {}

  public getLastSearchOptions() {
    return {
      minimumRating: 1,
      includedCategories: [],
      includedCookbooks: [],
      requiredIngredients: [],
      sortOption: SortOptions.RATING,
      sortDirection: SortDirection.DESC,
    }
  }
}

const knownCookbook = "KnownCookbook"

class RecipeServiceMock {
  public getAllKnownCookbooks() {
    return [knownCookbook]
  }

  public getAllKnownIngredients() {
    return []
  }

  public getAllKnownCategories() {
    return []
  }
}

describe("SearchComponent", () => {
  let component: SearchComponent
  let fixture: ComponentFixture<SearchComponent>
  let searchService: SearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        { provide: SearchService, useClass: SearchServiceMock },
        { provide: RecipeService, useClass: RecipeServiceMock },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    searchService = TestBed.inject(SearchService)
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should update rating", () => {
    component.selectedOptions.minimumRating = 1
    component.onNewRatingSelected(4)

    expect((component.selectedOptions.minimumRating = 4))
  })

  it("should update ingredient", () => {
    const ingredient = "TestIngredient"
    component.selectedOptions.requiredIngredients = []

    component.updateRequiredIngredients([ingredient])

    expect(component.selectedOptions.requiredIngredients.length).toBe(1)
    expect(component.selectedOptions.requiredIngredients[0]).toBe(ingredient)
  })

  it("should update categories", () => {
    const category = "TestCategory"
    component.selectedOptions.includedCategories = []

    component.updateIncludedCategories([category])

    expect(component.selectedOptions.includedCategories.length).toBe(1)
    expect(component.selectedOptions.includedCategories[0]).toBe(category)
  })

  it("should update cookbook", () => {
    const cookbook = "TestCookbook"
    component.selectedOptions.includedCookbooks = []

    component.updateIncludedCookbooks([cookbook])

    expect(component.selectedOptions.includedCookbooks.length).toBe(1)
    expect(component.selectedOptions.includedCookbooks[0]).toBe(cookbook)
  })

  it("should call searchService on search", () => {
    const searchSpy = spyOn(searchService, "search")
    const onSearchStartSpy = spyOn(component.onSearchStarted, "emit")

    component.onSearch()

    expect(searchSpy).toHaveBeenCalled()
    expect(onSearchStartSpy).toHaveBeenCalled()
  })

  it("should reset on clear", () => {
    const refreshTableDataSpy = spyOn(component.refreshTableData, "emit")

    component.clear()

    expect(component.selectedOptions).toBe(component.defaultSearchOptions)
    expect(component.selectedOptions.includedCookbooks).toEqual([knownCookbook])
    expect(refreshTableDataSpy).toHaveBeenCalled()
  })
})
