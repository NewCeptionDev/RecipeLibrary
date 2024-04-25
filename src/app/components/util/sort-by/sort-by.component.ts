import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { SortOptions } from "../../../models/sortOptions"
import { SortDirection } from "../../../models/sortDirection"

@Component({
  selector: "app-sort-by",
  templateUrl: "./sort-by.component.html",
  styleUrls: ["./sort-by.component.scss"],
})
export class SortByComponent implements OnInit {
  @Input()
  disabled: boolean = true

  @Input()
  selectedSortOption: SortOptions | undefined

  sortOptionIcon: string = ""

  sortDirection: SortDirection = SortDirection.ASC

  @Output()
  public sortDirectionChanged: EventEmitter<SortDirection> = new EventEmitter<SortDirection>()

  ngOnInit(): void {
    this.selectedSortOptionToIcon()
  }

  private selectedSortOptionToIcon() {
    switch (this.selectedSortOption) {
      case SortOptions.ALPHABET:
        this.sortOptionIcon = "abc"
        break
      case SortOptions.REQUIRED_TIME:
        this.sortOptionIcon = "timer"
        break
      case SortOptions.RATING:
      default:
        this.sortOptionIcon = "star"
    }
  }

  public adjustSortDirection() {
    if (this.disabled) {
      this.disabled = false
      this.sortDirection = SortDirection.ASC
    } else {
      switch (this.sortDirection) {
        case SortDirection.DESC:
          this.sortDirection = SortDirection.ASC
          break
        case SortDirection.ASC:
          this.sortDirection = SortDirection.DESC
          break
        default:
          throw new Error("Unknown SortDirection")
      }
    }

    this.sortDirectionChanged.emit(this.sortDirection)
  }

  protected readonly SortDirection = SortDirection
}
