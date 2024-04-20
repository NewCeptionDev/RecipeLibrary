import { TestBed } from "@angular/core/testing"
import { ElectronServiceMock } from "src/tests/mocks/ElectronServiceMock"
import { OptionalRecipeFeature } from "../models/optionalRecipeFeature"
import { ElectronService } from "./electron.service"
import { SettingsService } from "./settings.service"

describe("SettingsService", () => {
  let service: SettingsService
  let electronService: ElectronService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ElectronService, useClass: ElectronServiceMock }],
    })
    service = TestBed.inject(SettingsService)
    electronService = TestBed.inject(ElectronService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should update path and trigger filesave when updateRecipePath", () => {
    const expectedFilePath = "NewPath"
    // @ts-ignore
    const saveSpy = spyOn(service, "saveSettingsToFile")

    service.updateRecipePath(expectedFilePath)
    // @ts-ignore
    expect(service.settings.recipeSavePath).toBe(expectedFilePath)
    expect(saveSpy).toHaveBeenCalled()
  })

  it("should return path when getRecipePath", () => {
    const expectedPath = "Expected"
    // @ts-ignore
    service.settings.recipeSavePath = expectedPath

    expect(service.getRecipePath()).toBe(expectedPath)
  })

  it("should add feature when enableRecipeFeature given feature not yet enabled", () => {
    // @ts-ignore
    service.settings.enabledRecipeFeatures = []
    // @ts-ignore
    const saveSpy = spyOn(service, "saveSettingsToFile")

    service.enableRecipeFeature(OptionalRecipeFeature.CATEGORY)
    // @ts-ignore
    expect(service.settings.enabledRecipeFeatures).toContain(OptionalRecipeFeature.CATEGORY)
    expect(saveSpy).toHaveBeenCalled()
  })

  it("should not add feature when enableRecipeFeature given feature already enabled", () => {
    // @ts-ignore
    service.settings.enabledRecipeFeatures = [OptionalRecipeFeature.CATEGORY]
    // @ts-ignore
    const saveSpy = spyOn(service, "saveSettingsToFile")

    service.enableRecipeFeature(OptionalRecipeFeature.CATEGORY)
    // @ts-ignore
    expect(service.settings.enabledRecipeFeatures).toContain(OptionalRecipeFeature.CATEGORY)
    // @ts-ignore
    expect(service.settings.enabledRecipeFeatures).toHaveSize(1)
    expect(saveSpy).not.toHaveBeenCalled()
  })

  it("should remove feature when disableRecipeFeature given feature is enabled", () => {
    // @ts-ignore
    service.settings.enabledRecipeFeatures = [OptionalRecipeFeature.CATEGORY]
    // @ts-ignore
    const saveSpy = spyOn(service, "saveSettingsToFile")

    service.disableRecipeFeature(OptionalRecipeFeature.CATEGORY)
    // @ts-ignore
    expect(service.settings.enabledRecipeFeatures).not.toContain(OptionalRecipeFeature.CATEGORY)
    // @ts-ignore
    expect(service.settings.enabledRecipeFeatures).toHaveSize(0)
    expect(saveSpy).toHaveBeenCalled()
  })

  it("should do nothing when disableRecipeFeature given feature not enabled", () => {
    // @ts-ignore
    service.settings.enabledRecipeFeatures = []
    // @ts-ignore
    const saveSpy = spyOn(service, "saveSettingsToFile")

    service.disableRecipeFeature(OptionalRecipeFeature.CATEGORY)
    // @ts-ignore
    expect(service.settings.enabledRecipeFeatures).not.toContain(OptionalRecipeFeature.CATEGORY)
    // @ts-ignore
    expect(service.settings.enabledRecipeFeatures).toHaveSize(0)
    expect(saveSpy).not.toHaveBeenCalled()
  })

  it("should set enabledRecipeFeatures when setEnabledRecipeFeatures", () => {
    const expectedRecipeFeatures = [OptionalRecipeFeature.CATEGORY]

    service.setEnabledRecipeFeatures(expectedRecipeFeatures)
    // @ts-ignore
    expect(service.settings.enabledRecipeFeatures).toBe(expectedRecipeFeatures)
  })

  it("should return enabledRecipeFeatures when getEnabledRecipeFeatures", () => {
    const expectedFeatures = [OptionalRecipeFeature.CATEGORY]
    // @ts-ignore
    service.settings.enabledRecipeFeatures = expectedFeatures

    expect(service.getEnabledRecipeFeatures()).toBe(expectedFeatures)
  })

  it("should call electronService when saveSettings", () => {
    const saveSettingsSpy = spyOn(electronService, "saveSettings")
    service.registerElectronService(electronService)
    // @ts-ignore
    service.saveSettingsToFile()

    expect(saveSettingsSpy).toHaveBeenCalled()
  })

  it("should throw error when saveSettings given electronService not set", () => {
    // @ts-ignore
    expect(() => service.saveSettingsToFile()).toThrowError("ElectronService was not registered")
  })
})
