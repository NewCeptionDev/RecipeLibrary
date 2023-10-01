import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../components/util/snackbar/snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) {}

  public recipeAddedFeedback() {
    this.openSnackBar("Recipe added")
  }

  public recipeEditedFeedback() {
    this.openSnackBar("Recipe changed")
  }

  public recipeRemovedFeedback() {
    this.openSnackBar("Recipe removed")
  }

  private openSnackBar(content: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000,
      data: {
        content: content
      },
      horizontalPosition: "left",
      verticalPosition: "bottom",
      direction: "ltr"
    });
  }
}
