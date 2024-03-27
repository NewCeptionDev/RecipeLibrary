import { ChangeDetectorRef, Component, OnInit } from "@angular/core"
import { ElectronService } from "../../../services/electron.service"
import { FileService } from "../../../services/file.service"

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  constructor(
    private electronService: ElectronService,
    private fileService: FileService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // Dependency Injection
  }

  ngOnInit(): void {
    this.fileService.settingsChangedEvent.subscribe(() => {
      this.changeDetectorRef.detectChanges()
    })
  }

  public importLibrary() {
    this.electronService.requestImportLibrary()
  }

  public changeSavePath() {
    this.electronService.requestNewFileSavePath()
  }

  public getCurrentSavePath(): string {
    return this.fileService.getSavePath()
  }
}
