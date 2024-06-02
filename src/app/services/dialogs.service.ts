import { Injectable } from "@angular/core"
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog"
import { TwoButtonDialogComponent } from "../components/dialogs/two-button-dialog/two-button-dialog.component"
import { firstValueFrom } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class DialogsService {
  dialogOpen = false

  constructor(public dialog: MatDialog) {
    // Dependency Injection
  }

  public hasOpenDialog(): boolean {
    return this.dialogOpen
  }

  public discardNewRecipe(): Promise<boolean> {
    const dialog = this.openTwoButtonDialog(
      "Discard Changes",
      "Closing this window will discard your changes.\nAre you sure that you want to close the window?"
    )

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
    this.dialogOpen = true

    const dialogReference = this.dialog.open(TwoButtonDialogComponent, {
      data: {
        title,
        content,
      },
    })

    dialogReference.afterClosed().subscribe(() => {
      this.dialogOpen = false
    })

    return dialogReference
  }
}
