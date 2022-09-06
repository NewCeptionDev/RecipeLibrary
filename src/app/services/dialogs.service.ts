import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectItemsDialogComponent } from '../components/dialogs/select-items-dialog/select-items-dialog.component';
import { SelectItemsDialogData } from '../models/selectItemsDialogData';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(public dialog: MatDialog) { }

  public openSelectItemsDialog(input: SelectItemsDialogData) {
    this.dialog.open(SelectItemsDialogComponent, {
      data: input
    })
  }
}
