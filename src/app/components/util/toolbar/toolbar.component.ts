import { Component, inject } from "@angular/core"
import { ElectronService } from "../../../services/electron.service"
import { MatIconButton } from "@angular/material/button"
import { MatIcon } from "@angular/material/icon"

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  imports: [MatIconButton, MatIcon],
})
export class ToolbarComponent {
  private electronService = inject(ElectronService)

  public close() {
    this.electronService.closeApp()
  }

  public minimize() {
    this.electronService.minimizeApp()
  }

  public maximize() {
    this.electronService.maximizeApp()
  }
}
