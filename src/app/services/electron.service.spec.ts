import { TestBed } from "@angular/core/testing"

import { ElectronService } from "./electron.service"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import any = jasmine.any;

class IpcRendererMock {
  send = (channel: string, message?: any) => {}
  on = (channel: string, listener: any) => {}
}

describe("ElectronService", () => {
  let service: ElectronService
  let ipcRenderer: IpcRendererMock = new IpcRendererMock()

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    })
    service = TestBed.inject(ElectronService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should set up event listeners on creation", () => {
    const windowRequireSpy = spyOn(window, "require").and.returnValue(ipcRenderer)
    const ipcRendererOnSpy = spyOn(ipcRenderer, "on")
    const requestSettingsSpy = spyOn(service, "requestSettingsInformation")
    const requestLoadFileSpy = spyOn(service, "requestLoadFile")

    expect(ipcRendererOnSpy).toHaveBeenCalledWith("fileLoaded", any(Function))
    expect(ipcRendererOnSpy).toHaveBeenCalledWith("importLibraryFile", any(Function))
    expect(ipcRendererOnSpy).toHaveBeenCalledWith("settings", any(Function))

    expect(requestSettingsSpy).toHaveBeenCalled()
    expect(requestLoadFileSpy).toHaveBeenCalled()
  });

  it("should send message to ipc on closeApp", () => {
    const ipcRendererSendSpy = spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.closeApp()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("close")
  });

  it("should send message to ipc on minimizeApp", () => {
    const ipcRendererSendSpy = spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.minimizeApp()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("minimize")
  });

  it("should send message to ipc on maximizeApp", () => {
    const ipcRendererSendSpy = spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.maximizeApp()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("maximize")
  });

  it("should send message to ipc on saveRecipesToFile", () => {
    const ipcRendererSendSpy = spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.saveRecipesToFile({version: 1, recipes: []})
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("saveFile", any(String))
  });

  it("should send message to ipc on requestLoadFile", () => {
    const ipcRendererSendSpy = spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.requestLoadFile()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("loadFile")
  });

  it("should send message to ipc on requestSettingsInformation", () => {
    const ipcRendererSendSpy = spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.requestSettingsInformation()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("getSettings")
  });

  it("should send message to ipc on requestImportLibrary", () => {
    const ipcRendererSendSpy = spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.requestImportLibrary()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("importLibrary")
  });

  it("should send message to ipc on requestNewFileSavePath", () => {
    const ipcRendererSendSpy = spyOn(ipcRenderer, "send")
    // @ts-ignore
    service.ipc = ipcRenderer

    service.requestNewFileSavePath()
    expect(ipcRendererSendSpy).toHaveBeenCalledWith("newFileSavePath")
  });
})
