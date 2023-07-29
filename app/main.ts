import { BrowserWindow, app, screen, ipcMain } from "electron"
import * as path from "path"
import * as fs from "fs"

let win: BrowserWindow | null = null
const args = process.argv.slice(1)
const serve = args.some((val) => val === "--serve")

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize

  // Create the browser window.
  win = new BrowserWindow({
    // width: size.width,
    // height: size.height,
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false, // false if you want to run e2e test with Spectron
      devTools: true,
    },
    titleBarStyle: "hidden",
    minWidth: 1280,
    minHeight: 720
  })

  if (serve) {
    /*
     * const debug = require('electron-debug');
     * debug();
     */

    // require('electron-reloader')(module);
    win.loadURL("http://localhost:4200")
  } else {
    // Path when running electron executable
    let pathIndex = "./index.html"

    if (fs.existsSync(path.join(__dirname, "../dist/index.html"))) {
      // Path when running electron in local folder
      pathIndex = "../dist/index.html"
    }

    const url = new URL(path.join("file:", __dirname, pathIndex))
    win.loadURL(url.href)
  }

  // Emitted when the window is closed.
  win.on("closed", () => {
    /*
     * Dereference the window object, usually you would store window
     * in an array if your app supports multi windows, this is the time
     * when you should delete the corresponding element.
     */
    win = null
  })

  return win
}

try {
  /*
   * This method will be called when Electron has finished
   * initialization and is ready to create browser windows.
   * Some APIs can only be used after this event occurs.
   * Added 400 ms to fix the black background issue while using transparent window. More details at https://github.com/electron/electron/issues/15947
   */
  app.on("ready", () => setTimeout(createWindow, 400))

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    /*
     * On OS X it is common for applications and their menu bar
     * to stay active until the user quits explicitly with Cmd + Q
     */
    if (process.platform !== "darwin") {
      app.quit()
    }
  })

  app.on("activate", () => {
    /*
     * On OS X it's common to re-create a window in the app when the
     * dock icon is clicked and there are no other windows open.
     */
    if (win === null) {
      createWindow()
    }
  })
} catch (ignore) {
  /*
   * Catch Error
   * throw ignore;
   */
}

ipcMain.on("close", () => {
  app.quit()
})

ipcMain.on("minimize", () => {
  win?.minimize()
})

ipcMain.on("maximize", () => {
  if(win?.isMaximized()) {
    win?.unmaximize()
  } else {
    win?.maximize()
  }
})

ipcMain.on("saveFile", (event, object) => {
  fs.writeFileSync(app.getAppPath() + "/recipes.json", object, {encoding: "utf-8"})
})

ipcMain.on("loadFile", event => {
  if(fs.existsSync(app.getAppPath() + "/recipes.json")) {
    const recipes = fs.readFileSync(app.getAppPath() + "/recipes.json", {encoding: "utf-8"})

    event.sender.send("fileLoaded", recipes)
  }
})
