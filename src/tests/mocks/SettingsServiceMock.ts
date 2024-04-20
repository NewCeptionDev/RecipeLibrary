import { EventEmitter } from "@angular/core"

export class SettingsServiceMock {
  settingsChangedEvent = new EventEmitter().asObservable()

  getEnabledRecipeFeatures = () => []
}
