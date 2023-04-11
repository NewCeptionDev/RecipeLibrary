import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { DialogsService } from "src/app/services/dialogs.service"
import { ItemDataSource } from "src/app/util/ItemDataSource"

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
  public updateData: EventEmitter<string[]> = new EventEmitter()

  public tableDataSource: ItemDataSource<string>

  constructor(public dialogService: DialogsService) {
    this.tableDataSource = new ItemDataSource(this.data)
  }

  ngOnInit(): void {
    if (this.data.length > 0) {
      this.tableDataSource.setData(this.data)
    }
  }

  notAlreadyIncludedInData = (val: string): boolean => !this.data.includes(val)

  public onItemSelect(value: string) {
    if (!this.data.includes(value)) {
      this.data.push(value)
      this.tableDataSource.setData(this.data)
    }
  }

  public removeElement(element: string) {
    this.data.splice(this.data.indexOf(element), 1)
    this.tableDataSource.setData(this.data)
    this.updateData.emit(this.data)
  }
}
