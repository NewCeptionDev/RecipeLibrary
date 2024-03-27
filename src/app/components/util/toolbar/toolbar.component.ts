import { Component } from "@angular/core"
import { ElectronService } from "../../../services/electron.service"

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent {
  constructor(private electronService: ElectronService) {
    // Dependency Injection
  }

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
