import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { MatDialogRef } from "@angular/material/dialog"
import { DialogsService } from "src/app/services/dialogs.service"
import { ItemDataSource } from "src/app/util/ItemDataSource"
import { SelectItemsDialogComponent } from "../dialogs/select-items-dialog/select-items-dialog.component"

@Component({
  selector: "app-selected-items-display",
  templateUrl: "./selected-items-display.component.html",
  styleUrls: ["./selected-items-display.component.scss"],
})
export class SelectedItemsDisplayComponent implements OnInit {
  @Input()
  public editable: boolean = true

  @Input()
  public data: string[] = []

  public columns: string[] = ["name", "action"]

  @Input()
  public headline: string = "Items"

  @Input()
  public knownItems: string[] = []

  @Input()
  public onlyKnownItemsSelectable: boolean = false

  @Output()
  public onUpdateData: EventEmitter<string[]> = new EventEmitter()

  public tableDataSource: ItemDataSource<string>

  constructor(public dialogService: DialogsService) {
    this.tableDataSource = new ItemDataSource(this.data)
  }

  ngOnInit(): void {
    if (this.data.length > 0) {
      this.tableDataSource.setData(this.data)
    }
  }

  public openDialog() {
    if (this.editable) {
      const dialogRef: MatDialogRef<SelectItemsDialogComponent> =
        this.dialogService.openSelectItemsDialog({
          data: [...this.data],
          headline: this.headline,
          knownItems: this.knownItems,
          onlyAllowKnownItems: this.onlyKnownItemsSelectable,
        })

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.data = result
          this.tableDataSource.setData(this.data)
          this.onUpdateData.emit(result)
        }
      })
    }
  }
}
