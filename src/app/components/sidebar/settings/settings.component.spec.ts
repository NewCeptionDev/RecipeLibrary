import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SettingsComponent } from "./settings.component"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { ElectronService } from "../../../services/electron.service"
import { ElectronServiceMock } from "../../../../tests/mocks/ElectronServiceMock"
import { SettingsService } from "src/app/services/settings.service"
import { SettingsServiceMock } from "src/tests/mocks/SettingsServiceMock"
import { MatSlideToggleChange } from "@angular/material/slide-toggle"

describe("SettingsComponent", () => {
  let component: SettingsComponent
  let electronService: ElectronService
  let settingsService: SettingsService
  let fixture: ComponentFixture<SettingsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [MatSnackBarModule],
      providers: [
        { provide: SettingsService, useClass: SettingsServiceMock },
        { provide: ElectronService, useClass: ElectronServiceMock },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SettingsComponent)
    electronService = TestBed.inject(ElectronService)
    settingsService = TestBed.inject(SettingsService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should return correct filePath when getCurrentSavePath", () => {
    expect(component.getCurrentSavePath()).toBe("MockSavePath")
  })

  it("should call electron service requestImportLibrary when importLibrary", () => {
    const importLibrarySpy = spyOn(electronService, "requestImportLibrary")
    component.importLibrary()
    expect(importLibrarySpy).toHaveBeenCalled()
  })

  it("should call electron service requestNewFileSavePath when changeFilePath", () => {
    const requestPathSpy = spyOn(electronService, "requestNewFileSavePath")
    component.changeSavePath()
    expect(requestPathSpy).toHaveBeenCalled()
  })

  it("should return optionalFeature keys when getOptionalFeatures", () => {
    // @ts-ignore
    component.optionalRecipeFeatures = new Map([
      ["First", undefined],
      ["Second", undefined],
    ])

    expect(component.getOptionalFeatures()).toBe(["First", "Second"])
  })

  it("should return true if isOptionalFeatureEnabled given called with enabled feature", () => {
    const testedFeatureName = component.getOptionalFeatures()[0]
    // @ts-ignore
    const testedFeature = component.optionalRecipeFeatures.get(testedFeatureName)
    expect(testedFeature).not.toBeUndefined()
    spyOn(settingsService, "getEnabledRecipeFeatures").and.returnValue([testedFeature!])

    expect(component.isOptionalFeatureEnabled(testedFeature!)).toBeTrue()
  })

  it("should return false if isOptionalFeatureEnabled given called with disabled feature", () => {
    const testedFeatureName = component.getOptionalFeatures()[0]
    // @ts-ignore
    const testedFeature = component.optionalRecipeFeatures.get(testedFeatureName)
    expect(testedFeature).not.toBeUndefined()
    spyOn(settingsService, "getEnabledRecipeFeatures").and.returnValue([])

    expect(component.isOptionalFeatureEnabled(testedFeature!)).toBeFalse()
  })

  it("should throw error if isOptionalFeatureEnabled given called with unknown feature", () => {
    // @ts-ignore
    expect(() => component.isOptionalFeatureEnabled("Unknown")).toThrowError(
      "Unknown feature given"
    )
  })

  it("should call enableOptionalFeature when toggleOptionalFeature and checked is true", () => {
    const enableSpy = spyOn(settingsService, "enableRecipeFeature")
    const disableSpy = spyOn(settingsService, "disableRecipeFeature")

    const change: MatSlideToggleChange = {
      checked: true,
      // @ts-ignore
      source: {
        id: "Rating",
      },
    }

    component.toggleOptionalFeature(change)

    expect(enableSpy).toHaveBeenCalled()
    expect(disableSpy).not.toHaveBeenCalled()
  })

  it("should call disableOptionalFeature when toggleOptionalFeature and checked is false", () => {
    const enableSpy = spyOn(settingsService, "enableRecipeFeature")
    const disableSpy = spyOn(settingsService, "disableRecipeFeature")

    const change: MatSlideToggleChange = {
      checked: false,
      // @ts-ignore
      source: {
        id: "Rating",
      },
    }

    component.toggleOptionalFeature(change)

    expect(enableSpy).not.toHaveBeenCalled()
    expect(disableSpy).toHaveBeenCalled()
  })
})
