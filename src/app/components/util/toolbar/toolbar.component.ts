import { Component, OnInit } from '@angular/core';
import { ElectronService } from "../../../services/electron.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private electronService: ElectronService) { }

  ngOnInit(): void {
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
