import { Component, inject } from "@angular/core"
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from "@angular/material/dialog"
import { CdkScrollable } from "@angular/cdk/scrolling"
import { MatButton } from "@angular/material/button"

@Component({
  selector: "app-two-button-dialog",
  templateUrl: "./two-button-dialog.component.html",
  styleUrls: ["./two-button-dialog.component.scss"],
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class TwoButtonDialogComponent {
  dialogData = inject<{
    title: string
    content: string
  }>(MAT_DIALOG_DATA)

  public title: string = ""

  public content: string = ""

  constructor() {
    const dialogData = this.dialogData

    this.title = dialogData.title
    this.content = dialogData.content
  }
}
