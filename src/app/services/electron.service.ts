import { Injectable, NgZone } from "@angular/core"
import { FileService } from "./file.service"
import { Library } from "../models/library"
import { IpcRendererEvent } from "electron"
import { Settings } from "../../../app/main"
import { SettingsService } from "./settings.service"
import { OptionalRecipeFeature } from "../models/optionalRecipeFeature"

@Injectable({
  providedIn: "root",
})
export class ElectronService {
  private readonly ipc: Electron.IpcRenderer | undefined = undefined

  constructor(
    private fileService: FileService,
    private settingsService: SettingsService,
    private zone: NgZone
  ) {
    this.fileService.registerElectronService(this)
    this.settingsService.registerElectronService(this)

    if (window.require) {
      this.ipc = window.require("electron").ipcRenderer

      this.ipc.on("fileLoaded", (_: IpcRendererEvent, message: string) => {
        this.fileService.processSaveFile(message, true)
      })

      this.ipc.on("importLibraryFile", (_: IpcRendererEvent, message: string) => {
        this.zone.run(() => {
          this.fileService.processSaveFile(message, false)
        })
      })

      this.ipc.on("settings", (_, settings: Settings) => {
        this.settingsService.updateRecipePath(settings.recipeSavePath)
        this.settingsService.setEnabledRecipeFeatures(
          settings.enabledRecipeFeatures.map((elem) => this.mapToOptionalRecipeFeature(elem))
        )
      })

      this.requestSettingsInformation()
      this.requestLoadFile()
    }
  }

  public closeApp() {
    if (this.ipc) {
      this.ipc.send("close")
    }
  }

  public minimizeApp() {
    if (this.ipc) {
      this.ipc.send("minimize")
    }
  }

  public maximizeApp() {
    if (this.ipc) {
      this.ipc.send("maximize")
    }
  }

  public saveRecipesToFile(saveObject: Library) {
    if (this.ipc) {
      this.ipc.send("saveFile", JSON.stringify(saveObject))
    }
  }

  public requestLoadFile() {
    if (this.ipc) {
      this.ipc.send("loadFile")
    }
  }

  public requestSettingsInformation() {
    if (this.ipc) {
      this.ipc.send("getSettings")
    }
  }

  public requestImportLibrary() {
    if (this.ipc) {
      this.ipc.send("importLibrary")
    }
  }

  public requestNewFileSavePath() {
    if (this.ipc) {
      this.ipc.send("newFileSavePath")
    }
  }

  public saveSettings() {
    if (this.ipc) {
      const settings: Settings = {
        recipeSavePath: this.settingsService.getRecipePath(),
        enabledRecipeFeatures: this.settingsService
          .getEnabledRecipeFeatures()
          .map((elem) => elem.toString()),
      }
      this.ipc.send("saveSettings", settings)
    }
  }

  private mapToOptionalRecipeFeature(value: string): OptionalRecipeFeature {
    switch (value) {
      case "CATEGORY":
        return OptionalRecipeFeature.CATEGORY
      case "RATING":
        return OptionalRecipeFeature.RATING
      default:
        throw new Error("Unknown value given")
    }
  }
}
