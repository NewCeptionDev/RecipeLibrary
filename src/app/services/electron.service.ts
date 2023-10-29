import { EventEmitter, Injectable, NgZone } from "@angular/core";
import { FileService } from "./file.service"
import { Library } from "../models/library"
import { IpcRendererEvent } from "electron"

@Injectable({
  providedIn: "root",
})
export class ElectronService {
  private readonly ipc: Electron.IpcRenderer | undefined = undefined

  constructor(private fileService: FileService, private zone: NgZone) {
    this.fileService.registerElectronService(this)

    if (window.require) {
      this.ipc = window.require("electron").ipcRenderer

      this.ipc.on("fileLoaded", (event: IpcRendererEvent, message: string) => {
        this.fileService.processSaveFile(message, true)
      })

      this.ipc?.on("importLibraryFile", (event: IpcRendererEvent, message: string) => {
        this.zone.run(() => {
          this.fileService.processSaveFile(message, false)
        })
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

  public requestImportLibrary() {
    if(this.ipc) {
      this.ipc!.send("importLibrary")
    }
  }
}
