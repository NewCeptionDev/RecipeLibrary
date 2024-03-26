import { EventEmitter } from "@angular/core"

export class FileServiceMock {
  savePath = "MockSavePath"

  settingsChangedEvent = new EventEmitter().asObservable()
}
