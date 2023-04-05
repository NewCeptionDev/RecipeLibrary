import { Injectable } from "@angular/core"
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { TwoButtonDialogComponent } from "../components/dialogs/two-button-dialog/two-button-dialog.component"

@Injectable({
  providedIn: "root",
})
export class DialogsService {
  constructor(public dialog: MatDialog) {
    // empty
  }

  public openTwoButtonDialog(
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
