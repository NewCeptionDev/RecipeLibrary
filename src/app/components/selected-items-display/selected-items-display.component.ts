import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SelectItemsDialogData } from 'src/app/models/selectItemsDialogData';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ItemDataSource } from 'src/app/util/ItemDataSource';
import { SelectItemsDialogComponent } from '../dialogs/select-items-dialog/select-items-dialog.component';

@Component({
  selector: 'app-selected-items-display',
  templateUrl: './selected-items-display.component.html',
  styleUrls: ['./selected-items-display.component.scss']
})
export class SelectedItemsDisplayComponent implements OnInit {

  @Input()
  public editable: boolean = true;

  @Input()
  public data: string[] = []

  public columns: string[] = ["name", "action"]

  @Input()
  public headline: string = "Name";

  @Input()
  public knownItems: string[] = [];

  @Output()
  public onUpdateData: EventEmitter<string[]> = new EventEmitter();

  public tableDataSource: ItemDataSource<string>;

  constructor(public dialogService: DialogsService) {
    this.tableDataSource = new ItemDataSource(this.data);
   }

  ngOnInit(): void {
  }

  public openDialog() {
    if(this.editable) {
      const dialogRef: MatDialogRef<SelectItemsDialogComponent> = this.dialogService.openSelectItemsDialog({
        data: [...this.data],
        headline: this.headline,
        knownItems: this.knownItems
      })

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.data = result;
          this.tableDataSource.setData(this.data);
          this.onUpdateData.emit(result);
        }
      })
    }
  }
}
