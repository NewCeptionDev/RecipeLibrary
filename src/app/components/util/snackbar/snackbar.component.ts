import { Component, Inject, inject } from "@angular/core"
import { MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA, MatLegacySnackBarRef as MatSnackBarRef } from "@angular/material/legacy-snack-bar"

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.scss"],
})
export class SnackbarComponent {
  public content: string = ""

  snackBarRef = inject(MatSnackBarRef)

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public snackbarData: { content: string }
  ) {
    this.content = snackbarData.content
  }
}
