import * as electron from "electron"
import { app, BrowserWindow, ipcMain } from "electron"
import * as path from "path"
import * as fs from "fs"

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  // @ts-ignore TS1108
  return
}

let win: BrowserWindow | null = null
const args = process.argv.slice(1)
const serve = args.some((val) => val === "--serve")

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false
  }

  const ChildProcess = require("child_process")
  const path = require("path")

  const appFolder = path.resolve(process.execPath, "..")
  const rootAtomFolder = path.resolve(appFolder, "..")
  const updateDotExe = path.resolve(path.join(rootAtomFolder, "Update.exe"))
  const exeName = path.basename(process.execPath)

  const spawn = function (command: any, args: any) {
    let spawnedProcess, error

    try {
      spawnedProcess = ChildProcess.spawn(command, args, { detached: true })
    } catch (error) {}

    return spawnedProcess
  }

  const spawnUpdate = function (args: any) {
    return spawn(updateDotExe, args)
  }

  const squirrelEvent = process.argv[1]
  switch (squirrelEvent) {
    case "--squirrel-install":
    case "--squirrel-updated":
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(["--createShortcut", exeName])

      setTimeout(app.quit, 1000)
      return true

    case "--squirrel-uninstall":
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(["--removeShortcut", exeName])

      setTimeout(app.quit, 1000)
      return true

    case "--squirrel-obsolete":
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit()
      return true
  }

  return false
}

function createWindow(): BrowserWindow {
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
      devTools: false,
    },
    titleBarStyle: "hidden",
    minWidth: 1280,
    minHeight: 720,
    frame: false,
    icon: path.join(__dirname, "../assets/RecipeLibraryIcon.png"),
  })

  if (serve) {
    /*
     * const debug = require('electron-debug');
     * debug();
     */

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

const defaultRecipeSavePath = path.resolve(
  app.getPath("documents"),
  "RecipeLibrary",
  "recipes.json"
)
let settings: Settings = {
  recipeSavePath: defaultRecipeSavePath,
  enabledRecipeFeatures: [],
}
const settingsFilePath = app.getPath("userData") + "/settings.json"

// Load settings
loadSettings()

/**
 *
 * Event Handling
 *
 */

// Close Window
ipcMain.on("close", () => {
  app.quit()
})

// Minimize Window
ipcMain.on("minimize", () => {
  win?.minimize()
})

// Maximize Window
ipcMain.on("maximize", () => {
  if (win?.isMaximized()) {
    win?.unmaximize()
  } else {
    win?.maximize()
  }
})

// Save recipes to file
ipcMain.on("saveFile", (event, object) => {
  saveRecipes(object)
})

// Load recipes from file
ipcMain.on("loadFile", (event) => {
  event.sender.send("fileLoaded", loadRecipes())
})

// Send settings to frontend
ipcMain.on("getSettings", (event) => {
  sendSettingsToFrontend(event.sender)
})

// Select and read file and return recipes read to frontend
ipcMain.on("importLibrary", async (event) => {
  if (!win) {
    return
  }

  const selectionResult = electron.dialog.showOpenDialogSync(win, {
    title: "Recipe Library - Select Library File",
    properties: ["openFile"],
    defaultPath: app.getPath("documents"),
  })

  if (selectionResult && fs.existsSync(selectionResult[0])) {
    const recipes = fs.readFileSync(selectionResult[0], {
      encoding: "utf-8",
    })

    event.sender.send("importLibraryFile", recipes)
  }
})

// Select folder to be new save path, change settings and save recipes at new path
ipcMain.on("newFileSavePath", async (event) => {
  if (!win) {
    return
  }

  const selectionResult = electron.dialog.showOpenDialogSync(win, {
    title: "Recipe Library - Select Folder for Save File",
    properties: ["openDirectory"],
    defaultPath: app.getPath("documents"),
  })

  if (selectionResult && fs.existsSync(selectionResult[0])) {
    const newRecipeSavePath = path.resolve(selectionResult[0], "recipes.json")
    event.sender.send("newRecipeFilePath", newRecipeSavePath)
  }
})

ipcMain.on("saveSettings", async (event, object: Settings) => {
  const differentFilePath = settings.recipeSavePath !== object.recipeSavePath
  let recipes
  if (differentFilePath) {
    recipes = loadRecipes()
  }

  settings = object
  saveSettings()

  if (differentFilePath) {
    saveRecipes(recipes)
  }

  sendSettingsToFrontend(event.sender)
})

/**
 *
 * Common functions  and interfaces
 *
 */

function loadSettings() {
  if (fs.existsSync(settingsFilePath)) {
    const settingsFile = fs.readFileSync(settingsFilePath, {
      encoding: "utf-8",
    })

    const loadedSettings: Settings = JSON.parse(settingsFile)

    settings = loadedSettings
  } else {
    saveSettings()
  }
}

function saveSettings() {
  fs.writeFileSync(settingsFilePath, JSON.stringify(settings), { encoding: "utf-8" })
}

function saveRecipes(recipes: any) {
  if (
    settings.recipeSavePath === defaultRecipeSavePath &&
    !fs.existsSync(settings.recipeSavePath)
  ) {
    const folder = defaultRecipeSavePath.substring(0, defaultRecipeSavePath.length - 13)
    fs.mkdirSync(folder)
  }

  fs.writeFileSync(settings.recipeSavePath, recipes, { encoding: "utf-8" })
}

function loadRecipes(): any {
  if (fs.existsSync(settings.recipeSavePath)) {
    return fs.readFileSync(settings.recipeSavePath, {
      encoding: "utf-8",
    })
  } else {
    return []
  }
}

function sendSettingsToFrontend(sender: Electron.WebContents) {
  sender.send("settings", settings)
}

export interface Settings {
  recipeSavePath: string
  enabledRecipeFeatures: string[]
}
