import { Component, Inject } from "@angular/core"
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog"

@Component({
  selector: "app-two-button-dialog",
  templateUrl: "./two-button-dialog.component.html",
  styleUrls: ["./two-button-dialog.component.scss"],
})
export class TwoButtonDialogComponent {
  public title: string = ""

  public content: string = ""

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { title: string; content: string }
  ) {
    this.title = dialogData.title
    this.content = dialogData.content
  }
}
