import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SearchComponent } from "./search.component"
import { SearchService } from "../../../services/search.service"
import { RecipeService } from "../../../services/recipe.service"
import { SearchServiceMock } from "../../../../tests/mocks/SearchServiceMock"
import { RecipeServiceMock } from "../../../../tests/mocks/RecipeServiceMock"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"
import { SettingsService } from "src/app/services/settings.service"
import { SettingsServiceMock } from "src/tests/mocks/SettingsServiceMock"

const KNOWN_COOKBOOK = "KnownCookbook"

describe("SearchComponent", () => {
  let component: SearchComponent
  let fixture: ComponentFixture<SearchComponent>
  let searchService: SearchService
  let recipeService: RecipeService
  let settingsService: SettingsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        { provide: SearchService, useClass: SearchServiceMock },
        { provide: RecipeService, useClass: RecipeServiceMock },
        { provide: SettingsService, useClass: SettingsServiceMock },
      ],
    }).compileComponents()

    searchService = TestBed.inject(SearchService)
    recipeService = TestBed.inject(RecipeService)
    settingsService = TestBed.inject(SettingsService)
    // override mock functions
    spyOn(recipeService, "getAllKnownCookbooks").and.returnValue([KNOWN_COOKBOOK])

    fixture = TestBed.createComponent(SearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should update rating", () => {
    component.selectedOptions.minimumRating = 1
    component.onNewRatingSelected(4)

    expect((component.selectedOptions.minimumRating = 4))
  })

  it("should update required time", () => {
    component.selectedOptions.maximumRequiredTime = 1
    component.onNewRequiredTimeSelected(4)

    expect((component.selectedOptions.maximumRequiredTime = 4))
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
    const onSearchStartSpy = spyOn(component.searchStarted, "emit")

    component.onSearch()

    expect(searchSpy).toHaveBeenCalled()
    expect(onSearchStartSpy).toHaveBeenCalled()
  })

  it("should reset on clear", () => {
    const refreshTableDataSpy = spyOn(component.refreshTableData, "emit")

    component.clear()

    expect(component.selectedOptions).toBe(component.defaultSearchOptions)
    expect(component.selectedOptions.includedCookbooks).toEqual([KNOWN_COOKBOOK])
    expect(refreshTableDataSpy).toHaveBeenCalled()
  })

  it("should return true when isCategoryRecipeFeatureEnabled given Category enabled", () => {
    spyOn(settingsService, "getEnabledRecipeFeatures").and.returnValue([
      OptionalRecipeFeature.CATEGORY,
    ])
    expect(component.isCategoryRecipeFeatureEnabled()).toBeTrue()
  })

  it("should return false when isCategoryRecipeFeatureEnabled given Category disabled", () => {
    spyOn(settingsService, "getEnabledRecipeFeatures").and.returnValue([])
    expect(component.isCategoryRecipeFeatureEnabled()).toBeFalse()
  })

  it("should return true when isRatingRecipeFeatureEnabled given Rating enabled", () => {
    spyOn(settingsService, "getEnabledRecipeFeatures").and.returnValue([
      OptionalRecipeFeature.RATING,
    ])
    expect(component.isRatingRecipeFeatureEnabled()).toBeTrue()
  })

  it("should return false when isRatingRecipeFeatureEnabled given Rating disabled", () => {
    spyOn(settingsService, "getEnabledRecipeFeatures").and.returnValue([])
    expect(component.isRatingRecipeFeatureEnabled()).toBeFalse()
  })

  it("should return true when isRequiredTimeRecipeFeatureEnabled given RequiredTime enabled", () => {
    spyOn(settingsService, "getEnabledRecipeFeatures").and.returnValue([
      OptionalRecipeFeature.REQUIRED_TIME,
    ])
    expect(component.isRequiredTimeRecipeFeatureEnabled()).toBeTrue()
  })

  it("should return false when isRequiredTimeRecipeFeatureEnabled given RequiredTime disabled", () => {
    spyOn(settingsService, "getEnabledRecipeFeatures").and.returnValue([])
    expect(component.isRequiredTimeRecipeFeatureEnabled()).toBeFalse()
  })
})
