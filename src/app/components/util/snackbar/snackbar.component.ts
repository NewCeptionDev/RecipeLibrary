import { Component, inject } from "@angular/core"
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar"

@Component({
    selector: "app-snackbar",
    templateUrl: "./snackbar.component.html",
    styleUrls: ["./snackbar.component.scss"]
})
export class SnackbarComponent {
  snackbarData = inject<{
    content: string;
}>(MAT_SNACK_BAR_DATA);

  public content: string = ""

  snackBarRef = inject(MatSnackBarRef)

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const snackbarData = this.snackbarData;

    this.content = snackbarData.content
  }
}
