import { Injectable } from "@angular/core"
import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar"
import { SnackbarComponent } from "../components/util/snackbar/snackbar.component"

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {
    // Dependency Injection
  }

  public recipeAddedFeedback() {
    this.openSnackBar("Recipe added")
  }

  public recipeEditedFeedback() {
    this.openSnackBar("Recipe changed")
  }

  public recipeRemovedFeedback() {
    this.openSnackBar("Recipe removed")
  }

  public libraryImportedFeedback() {
    this.openSnackBar("Library imported")
  }

  private openSnackBar(content: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000,
      data: {
        content,
      },
      horizontalPosition: "left",
      verticalPosition: "bottom",
      direction: "ltr",
    })
  }
}
