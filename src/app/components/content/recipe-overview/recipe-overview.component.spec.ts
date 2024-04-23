import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RecipeOverviewComponent } from "./recipe-overview.component"
import { MatIconModule } from "@angular/material/icon"
import { SettingsService } from "src/app/services/settings.service"
import { SettingsServiceMock } from "src/tests/mocks/SettingsServiceMock"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"

describe("RecipeOverviewComponent", () => {
  let component: RecipeOverviewComponent
  let settingsService: SettingsService
  let fixture: ComponentFixture<RecipeOverviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeOverviewComponent],
      imports: [MatIconModule],
      providers: [{ provide: SettingsService, useClass: SettingsServiceMock }],
    }).compileComponents()

    fixture = TestBed.createComponent(RecipeOverviewComponent)
    settingsService = TestBed.inject(SettingsService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
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
