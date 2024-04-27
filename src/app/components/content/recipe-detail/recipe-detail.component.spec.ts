import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RecipeDetailComponent } from "./recipe-detail.component"
import { MatIconModule } from "@angular/material/icon"
import { SettingsService } from "src/app/services/settings.service"
import { SettingsServiceMock } from "src/tests/mocks/SettingsServiceMock"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"

describe("RecipeDetailComponent", () => {
  let component: RecipeDetailComponent
  let settingsService: SettingsService
  let fixture: ComponentFixture<RecipeDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeDetailComponent],
      imports: [MatIconModule],
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
})
