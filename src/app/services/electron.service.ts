import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  // @ts-ignore
  private ipc: Electron.IpcRenderer | undefined = undefined;

  constructor() {

    if(window.require) {
      this.ipc = window.require("electron").ipcRenderer
    }

  }

  public closeApp() {
    if(this.ipc) {
      this.ipc.send("close")
    }
  }
}
