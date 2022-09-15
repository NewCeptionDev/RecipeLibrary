import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectItemsDialogComponent } from '../components/dialogs/select-items-dialog/select-items-dialog.component';
import { TwoButtonDialogComponent } from '../components/dialogs/two-button-dialog/two-button-dialog.component';
import { SelectItemsDialogData } from '../models/selectItemsDialogData';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(public dialog: MatDialog) { }

  public openSelectItemsDialog(input: SelectItemsDialogData): MatDialogRef<SelectItemsDialogComponent> {
    return this.dialog.open(SelectItemsDialogComponent, {
      data: input
    })
  }

  public openTwoButtonDialog(title: string, content: string): MatDialogRef<TwoButtonDialogComponent> {
    return this.dialog.open(TwoButtonDialogComponent, {
      data: {
        title: title,
        content: content
      }
    })
  }
}
