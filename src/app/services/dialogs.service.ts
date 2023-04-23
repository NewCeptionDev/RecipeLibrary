import { Injectable } from "@angular/core"
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { TwoButtonDialogComponent } from "../components/dialogs/two-button-dialog/two-button-dialog.component"
import { firstValueFrom, Observable } from "rxjs";
import { Recipe } from "../models/recipe";

@Injectable({
  providedIn: "root",
})
export class DialogsService {
  constructor(public dialog: MatDialog) {
    // empty
  }

  public discardNewRecipe(): Promise<boolean> {
    const dialog = this.openTwoButtonDialog("Discard Changes", "Closing this window will discard your changes.\nAre you sure that you want to close the window?")

    return firstValueFrom(dialog.afterClosed())
  }

  public deleteRecipe(recipeName: string): Promise<boolean> {
    const dialog = this.openTwoButtonDialog(
      "Delete recipe",
      `Are you sure that you want to delete Recipe ${recipeName}?\nA deleted recipe cannot be recovered.`
    )

    return firstValueFrom(dialog.afterClosed())
  }

  private openTwoButtonDialog(
    title: string,
    content: string
  ): MatDialogRef<TwoButtonDialogComponent> {
    return this.dialog.open(TwoButtonDialogComponent, {
      data: {
        title,
        content,
      },
    })
  }
}
