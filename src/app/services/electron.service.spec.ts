import { TestBed } from "@angular/core/testing"

import { ElectronService } from "./electron.service"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { SettingsService } from "./settings.service"
import { SettingsServiceMock } from "src/tests/mocks/SettingsServiceMock"
import { OptionalRecipeFeature } from "../models/optionalRecipeFeature"
import { beforeEach, describe, expect, it, vi } from "vitest"

class IpcRendererMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  send = (channel: string, message?: any) => {
    // Mock implementation
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  on = (channel: string, listener: any) => {
    // Mock implementation
  }
}

describe("ElectronService", () => {
  let service: ElectronService
  let settingsService: SettingsService
  const ipcRenderer: IpcRendererMock = new IpcRendererMock()

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [{ provide: SettingsService, useClass: SettingsServiceMock }],
    })
    service = TestBed.inject(ElectronService)
    settingsService = TestBed.inject(SettingsService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should send message to ipc on closeApp", () => {
    const ipcRendererSendSpy = vi.spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.closeApp()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("close")
  })

  it("should send message to ipc on minimizeApp", () => {
    const ipcRendererSendSpy = vi.spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.minimizeApp()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("minimize")
  })

  it("should send message to ipc on maximizeApp", () => {
    const ipcRendererSendSpy = vi.spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.maximizeApp()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("maximize")
  })

  it("should send message to ipc on saveRecipesToFile", () => {
    const ipcRendererSendSpy = vi.spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.saveRecipesToFile({ version: 1, recipes: [] })
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("saveFile", expect.any(String))
  })

  it("should send message to ipc on requestLoadFile", () => {
    const ipcRendererSendSpy = vi.spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.requestLoadFile()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("loadFile")
  })

  it("should send message to ipc on requestSettingsInformation", () => {
    const ipcRendererSendSpy = vi.spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.requestSettingsInformation()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("getSettings")
  })

  it("should send message to ipc on requestImportLibrary", () => {
    const ipcRendererSendSpy = vi.spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.requestImportLibrary()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("importLibrary")
  })

  it("should send message to ipc on requestNewFileSavePath", () => {
    const ipcRendererSendSpy = vi.spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.requestNewFileSavePath()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("newFileSavePath")
  })

  it("should send message to ipc on saveSettings", () => {
    const ipcRendererSendSpy = vi.spyOn(ipcRenderer, "send")
    const getSavePathSpy = vi
      .spyOn(settingsService, "getRecipePath")
      .mockReturnValue("MockSavePath")
    const getEnabledFeaturesSpy = vi
      .spyOn(settingsService, "getEnabledRecipeFeatures")
      .mockReturnValue([OptionalRecipeFeature.CATEGORY])
    // @ts-ignore
    service.ipc = ipcRenderer

    service.saveSettings()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("saveSettings", {
      recipeSavePath: "MockSavePath",
      enabledRecipeFeatures: ["CATEGORY"],
    })
    expect(getSavePathSpy).toHaveBeenCalled()
    expect(getEnabledFeaturesSpy).toHaveBeenCalled()
  })

  it("should correctly map Category OptionalRecipeFeature when mapToOptionalRecipeFeature", () => {
    // @ts-ignore
    expect(service.mapToOptionalRecipeFeature("CATEGORY")).toBe(OptionalRecipeFeature.CATEGORY)
  })

  it("should correctly map Rating OptionalRecipeFeature when mapToOptionalRecipeFeature", () => {
    // @ts-ignore
    expect(service.mapToOptionalRecipeFeature("RATING")).toBe(OptionalRecipeFeature.RATING)
  })

  it("should correctly map RequiredTime OptionalRecipeFeature when mapToOptionalRecipeFeature", () => {
    // @ts-ignore
    expect(service.mapToOptionalRecipeFeature("REQUIRED_TIME")).toBe(
      OptionalRecipeFeature.REQUIRED_TIME
    )
  })

  it("should throw error when mapToOptionalRecipeFeature given unknown feature", () => {
    // @ts-ignore
    expect(() => service.mapToOptionalRecipeFeature("Unknown")).toThrowError("Unknown value given")
  })
})

describe("Electron Service Constructor", () => {
  let ipcRendererOnSpy: any
  const ipcRenderer: IpcRendererMock = new IpcRendererMock()

  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    window.require = (requiredElement: never) => ({ ipcRenderer })
    ipcRendererOnSpy = vi.spyOn(ipcRenderer, "on")
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    })
    TestBed.inject(ElectronService)
  })

  it("should set up event listeners on creation", () => {
    expect(ipcRendererOnSpy).toHaveBeenCalledWith("fileLoaded", expect.any(Function))
    expect(ipcRendererOnSpy).toHaveBeenCalledWith("importLibraryFile", expect.any(Function))
    expect(ipcRendererOnSpy).toHaveBeenCalledWith("settings", expect.any(Function))
  })
})
