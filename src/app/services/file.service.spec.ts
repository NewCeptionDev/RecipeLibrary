import { TestBed } from "@angular/core/testing"

import { FileService } from "./file.service"
import { RecipeService } from "./recipe.service"
import { ElectronService } from "./electron.service"
import { RecipeServiceMock } from "../../tests/mocks/RecipeServiceMock"
import { ElectronServiceMock } from "../../tests/mocks/ElectronServiceMock"

const BASIC_SAVE_OBJECT: string = '{"version":1,"recipes":[]}'

describe("FileService", () => {
  let service: FileService
  let electronService: ElectronService
  let recipeService: RecipeService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RecipeService, useClass: RecipeServiceMock },
        { provide: ElectronService, useClass: ElectronServiceMock },
      ],
    })
    service = TestBed.inject(FileService)
    recipeService = TestBed.inject(RecipeService)
    electronService = TestBed.inject(ElectronService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should call initialize when processSaveFile with initial true", () => {
    const initializeSpy = spyOn(recipeService, "initializeRecipeLibrary")
    service.processSaveFile(BASIC_SAVE_OBJECT, true)
    expect(initializeSpy).toHaveBeenCalled()
  })

  it("should call import when processSaveFile with initial false", () => {
    const importSpy = spyOn(recipeService, "importLibrary")
    service.processSaveFile(BASIC_SAVE_OBJECT, false)
    expect(importSpy).toHaveBeenCalled()
  })

  it("should call transformToCurrentVersion when processSaveFile with old Version", () => {
    // @ts-ignore
    const transformSpy = spyOn(service, "transformToCurrentVersion").and.callThrough()
    service.processSaveFile(BASIC_SAVE_OBJECT.replace("1", "0"), false)
    expect(transformSpy).toHaveBeenCalled()
  })

  it("should call saveRecipesToFile when saveLibrary", () => {
    const saveRecipesSpy = spyOn(electronService, "saveRecipesToFile")
    service.registerElectronService(electronService)
    service.saveLibrary()
    expect(saveRecipesSpy).toHaveBeenCalled()
  })

  it("should throw error if no electronService is registered on saveLibrary", () => {
    expect(() => service.saveLibrary()).toThrowError("No ElectronService registered")
  })

  it("should correctly update savePath and trigger updateEvent when setSavePath", () => {
    const path = "newPath"

    let triggered = false
    service.settingsChangedEvent.subscribe(() => {
      triggered = true
    })

    service.savePath = path
    // @ts-ignore
    expect(service._savePath).toBe(path)
    expect(triggered).toBeTrue()
  })
})
