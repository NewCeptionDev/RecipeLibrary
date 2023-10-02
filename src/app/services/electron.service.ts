import { EventEmitter, Injectable } from "@angular/core"
import { FileService } from "./file.service"
import { Library } from "../models/library"
import { IpcRendererEvent } from "electron"

@Injectable({
  providedIn: "root",
})
export class ElectronService {
  private readonly ipc: Electron.IpcRenderer | undefined = undefined

  constructor(private fileService: FileService) {
    this.fileService.registerElectronService(this)

    if (window.require) {
      this.ipc = window.require("electron").ipcRenderer

      this.ipc.on("fileLoaded", (event: IpcRendererEvent, message: string) => {
        this.fileService.processSaveFile(message)
      })

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
}
