import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
  public underlinedHeadline: boolean = false

  @Input()
  public knownItems: string[] = []

  @Input()
  public onlyKnownItemsSelectable: boolean = false

  @Input()
  public triggerRefresh: EventEmitter<void> | undefined

  @Output()
  public updateData: EventEmitter<string[]> = new EventEmitter()

  public tableDataSource: ItemDataSource<string>

  constructor() {
    this.tableDataSource = new ItemDataSource(this.data)
  }

  ngOnInit(): void {
    if (this.data.length > 0) {
      this.tableDataSource.setData(this.data)
    }

    if (!this.editable) {
      this.columns.splice(1, 1)
    }

    if(this.triggerRefresh) {
      this.triggerRefresh.subscribe(() => this.refreshTableData())
    }
  }

  notAlreadyIncludedInData = (val: string): boolean => !this.data.includes(val)

  public onItemSelect(value: string) {
    if (!this.data.includes(value)) {
      this.data.push(value)
      this.tableDataSource.setData(this.data)
      this.updateData.emit(this.data)
    }
  }

  public removeElement(element: string) {
    this.data.splice(this.data.indexOf(element), 1)
    this.tableDataSource.setData(this.data)
    this.updateData.emit(this.data)
  }

  public refreshTableData() {
    this.tableDataSource.setData(this.data)
  }
}
