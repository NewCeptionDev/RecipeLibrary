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
    enabledRecipeFeatures: [OptionalRecipeFeature.RATING],
  }

  public settingsChangedEvent: EventEmitter<void> = new EventEmitter<void>()

  private electronService: ElectronService | undefined

  public registerElectronService(electronService: ElectronService) {
    this.electronService = electronService
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
    if (this.electronService) {
      this.electronService.saveSettings()
    }
  }
}
