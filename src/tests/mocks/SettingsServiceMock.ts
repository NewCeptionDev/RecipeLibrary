import { EventEmitter } from "@angular/core"

export class SettingsServiceMock {
  settingsChangedEvent = new EventEmitter().asObservable()

  getEnabledRecipeFeatures = () => []

  getRecipePath = () => {
    // Mock implementation
  }

  registerElectronService = () => {
    // Mock Implementation
  }

  enableRecipeFeature = () => {
    // Mock Implementation
  }

  disableRecipeFeature = () => {
    // Mock Implementation
  }
}
