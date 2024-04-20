import { Injectable } from "@angular/core"
import { Library } from "../models/library"
import { RecipeService } from "./recipe.service"
import { ElectronService } from "./electron.service"

@Injectable({
  providedIn: "root",
})
export class FileService {
  private readonly CURRENT_FILE_VERSION = 1

  private electronService: ElectronService | undefined

  constructor(private recipeService: RecipeService) {
    this.recipeService.getRecipeChangeEvent().subscribe(() => this.saveLibrary())
  }

  public processSaveFile(fileContent: string, initial: boolean) {
    const object = JSON.parse(fileContent)

    let library: Library

    if (object.version !== this.CURRENT_FILE_VERSION) {
      library = this.transformToCurrentVersion(object)
    } else {
      library = <Library>object
    }

    if (initial) {
      this.recipeService.initializeRecipeLibrary(library.recipes)
    } else {
      this.recipeService.importLibrary(library.recipes)
    }
  }

  public saveLibrary() {
    const saveObject: Library = {
      version: this.CURRENT_FILE_VERSION,
      recipes: this.recipeService.getAllRecipes(),
    }

    if (this.electronService) {
      this.electronService.saveRecipesToFile(saveObject)
    } else {
      throw new Error("No ElectronService registered")
    }
  }

  private transformToCurrentVersion(libraryObject: object): Library {
    // TODO Update if File Version Changes
    return <Library>libraryObject
  }

  public registerElectronService(electronService: ElectronService) {
    this.electronService = electronService
  }
}
