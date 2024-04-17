import { EventEmitter, Injectable } from "@angular/core"
import { OptionalRecipeFeature } from "../models/optionalRecipeFeature"
import { Settings } from "../models/settings"
import { ElectronService } from "./electron.service"

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private settings: Settings = {
    recipeSavePath: "",
    enabledRecipeFeatures: [],
  }

  public settingsChangedEvent: EventEmitter<void> = new EventEmitter<void>()

  constructor(private electronService: ElectronService) {
    // Dependency Injection
  }

  public updateRecipePath(newPath: string) {
    this.settings.recipeSavePath = newPath
  }

  public getRecipePath(): string {
    return this.settings.recipeSavePath
  }

  public enableRecipeFeature(feature: OptionalRecipeFeature) {
    this.settings.enabledRecipeFeatures.push(feature)
    this.saveSettingsToFile()
  }

  public disableRecipeFeature(feature: OptionalRecipeFeature) {
    const index = this.settings.enabledRecipeFeatures.indexOf(feature)
    if (index !== -1) {
      this.settings.enabledRecipeFeatures.splice(index, 1)
      this.saveSettingsToFile()
    }
  }

  public setEnabledRecipeFeatures(features: OptionalRecipeFeature[]) {
    this.settings.enabledRecipeFeatures = features
  }

  public getEnabledRecipeFeatures() {
    return this.settings.enabledRecipeFeatures
  }

  private saveSettingsToFile() {
    this.electronService.saveSettings()
  }
}
