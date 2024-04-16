import { ChangeDetectorRef, Component, OnInit } from "@angular/core"
import { SettingsService } from "src/app/services/settings.service"
import { ElectronService } from "../../../services/electron.service"

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  constructor(
    private electronService: ElectronService,
    private settingsService: SettingsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // Dependency Injection
  }

  ngOnInit(): void {
    this.settingsService.settingsChangedEvent.subscribe(() => {
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
    return this.settingsService.getRecipePath()
  }
}
