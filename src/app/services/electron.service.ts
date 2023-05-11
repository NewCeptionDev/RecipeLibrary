import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  // @ts-ignore
  private ipc: Electron.IpcRenderer | undefined = undefined;

  constructor(private recipeService: RecipeService) {

    if(window.require) {
      this.ipc = window.require("electron").ipcRenderer
    }

    this.ipc.on("fileLoaded", (event: Electron.IpcRendererEvent, message: string) => {
      this.recipeService.initializeRecipeLibrary(message)
    })
  }

  public closeApp() {
    if(this.ipc) {
      this.ipc.send("close")
    }
  }

  public minimizeApp() {
    if(this.ipc) {
      this.ipc.send("minimize")
    }
  }

  public maximizeApp() {
    if(this.ipc) {
      this.ipc.send("maximize")
    }
  }
}
