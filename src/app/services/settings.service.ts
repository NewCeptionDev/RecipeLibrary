import { EventEmitter, Injectable } from "@angular/core"
import { OptionalRecipeFeature } from "../models/OptionalRecipeFeature"
import { ElectronService } from "./electron.service"

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private recipeLibrarySavePath: string = ""

  private enabledRecipeFeatures: OptionalRecipeFeature[] = []

  public settingsChangedEvent: EventEmitter<void> = new EventEmitter<void>()

  constructor(private electronService: ElectronService) {
    // Dependency Injection
  }

  public updateRecipePath(newPath: string) {
    this.recipeLibrarySavePath = newPath
  }

  public getRecipePath(): string {
    return this.recipeLibrarySavePath
  }

  public enableRecipeFeature(feature: OptionalRecipeFeature) {
    this.enabledRecipeFeatures.push(feature)
    this.saveSettingsToFile()
  }

  public disableRecipeFeature(feature: OptionalRecipeFeature) {
    const index = this.enabledRecipeFeatures.indexOf(feature)
    if (index !== -1) {
      this.enabledRecipeFeatures.splice(index, 1)
      this.saveSettingsToFile()
    }
  }

  public getEnabledRecipeFeatures() {
    return this.enabledRecipeFeatures
  }

  private saveSettingsToFile() {
    this.electronService.saveFrontendSettings({ enabledRecipeFeatures: this.enabledRecipeFeatures })
  }
}
