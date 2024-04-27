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
    enabledRecipeFeatures: [
      OptionalRecipeFeature.RATING,
      OptionalRecipeFeature.CATEGORY,
      OptionalRecipeFeature.REQUIRED_TIME,
    ],
  }

  public settingsChangedEvent: EventEmitter<void> = new EventEmitter<void>()

  private electronService: ElectronService | undefined

  public registerElectronService(electronService: ElectronService) {
    this.electronService = electronService
  }

  public updateRecipePath(newPath: string) {
    this.settings.recipeSavePath = newPath
    this.saveSettingsToFile()
  }

  public getRecipePath(): string {
    return this.settings.recipeSavePath
  }

  public enableRecipeFeature(feature: OptionalRecipeFeature) {
    if (!this.settings.enabledRecipeFeatures.includes(feature)) {
      this.settings.enabledRecipeFeatures.push(feature)
      this.saveSettingsToFile()
    }
  }

  public disableRecipeFeature(feature: OptionalRecipeFeature) {
    const index = this.settings.enabledRecipeFeatures.indexOf(feature)
    if (index !== -1) {
      this.settings.enabledRecipeFeatures.splice(index, 1)
      this.saveSettingsToFile()
    }
  }

  public setSettings(settings: Settings) {
    this.settings = settings
  }

  public getEnabledRecipeFeatures() {
    return this.settings.enabledRecipeFeatures
  }

  private saveSettingsToFile() {
    if (this.electronService) {
      this.electronService.saveSettings()
      this.settingsChangedEvent.emit()
    } else {
      throw new Error("ElectronService was not registered")
    }
  }
}
