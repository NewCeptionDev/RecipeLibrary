import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RecipeDetailComponent } from "./recipe-detail.component"
import { MatIconModule } from "@angular/material/icon"
import { SettingsService } from "src/app/services/settings.service"
import { SettingsServiceMock } from "src/tests/mocks/SettingsServiceMock"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"
import { vi } from "vitest"

describe("RecipeDetailComponent", () => {
  let component: RecipeDetailComponent
  let settingsService: SettingsService
  let fixture: ComponentFixture<RecipeDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, RecipeDetailComponent],
      providers: [{ provide: SettingsService, useClass: SettingsServiceMock }],
    }).compileComponents()

    fixture = TestBed.createComponent(RecipeDetailComponent)
    settingsService = TestBed.inject(SettingsService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should return true when isCategoryRecipeFeatureEnabled given Category enabled", () => {
    vi.spyOn(settingsService, "getEnabledRecipeFeatures").mockReturnValue([
      OptionalRecipeFeature.CATEGORY,
    ])
    expect(component.isCategoryRecipeFeatureEnabled()).toBe(true)
  })

  it("should return false when isCategoryRecipeFeatureEnabled given Category disabled", () => {
    vi.spyOn(settingsService, "getEnabledRecipeFeatures").mockReturnValue([])
    expect(component.isCategoryRecipeFeatureEnabled()).toBe(false)
  })

  it("should return true when isRatingRecipeFeatureEnabled given Rating enabled", () => {
    vi.spyOn(settingsService, "getEnabledRecipeFeatures").mockReturnValue([
      OptionalRecipeFeature.RATING,
    ])
    expect(component.isRatingRecipeFeatureEnabled()).toBe(true)
  })

  it("should return false when isRatingRecipeFeatureEnabled given Rating disabled", () => {
    vi.spyOn(settingsService, "getEnabledRecipeFeatures").mockReturnValue([])
    expect(component.isRatingRecipeFeatureEnabled()).toBe(false)
  })

  it("should return true when isRequiredTimeRecipeFeatureEnabled given RequiredTime enabled", () => {
    vi.spyOn(settingsService, "getEnabledRecipeFeatures").mockReturnValue([
      OptionalRecipeFeature.REQUIRED_TIME,
    ])
    expect(component.isRequiredTimeRecipeFeatureEnabled()).toBe(true)
  })

  it("should return false when isRequiredTimeRecipeFeatureEnabled given RequiredTime disabled", () => {
    vi.spyOn(settingsService, "getEnabledRecipeFeatures").mockReturnValue([])
    expect(component.isRequiredTimeRecipeFeatureEnabled()).toBe(false)
  })

  it("should return true when isPageNumberRecipeFeatureEnabled given PageNumber enabled", () => {
    vi.spyOn(settingsService, "getEnabledRecipeFeatures").mockReturnValue([
      OptionalRecipeFeature.PAGE_NUMBER,
    ])
    expect(component.isPageNumberRecipeFeatureEnabled()).toBe(true)
  })

  it("should return false when isPageNumberRecipeFeatureEnabled given PageNumber disabled", () => {
    vi.spyOn(settingsService, "getEnabledRecipeFeatures").mockReturnValue([])
    expect(component.isPageNumberRecipeFeatureEnabled()).toBe(false)
  })
})
