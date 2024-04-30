import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormControl } from "@angular/forms"

@Component({
  selector: "app-page-number-display",
  templateUrl: "./page-number-display.component.html",
  styleUrls: ["./page-number-display.component.scss"],
})
export class PageNumberDisplayComponent implements OnInit {
  @Input()
  public editable: boolean = false

  @Output()
  public newPageNumber = new EventEmitter()

  @Input()
  public pageNumber: string = ""

  pageNumberFormControl: FormControl = new FormControl(this.pageNumber)

  ngOnInit(): void {
    this.pageNumberFormControl.setValue(this.pageNumber)

    this.pageNumberFormControl.valueChanges.subscribe((value) => {
      this.updatePageNumber(value)
    })
  }

  private updatePageNumber(value: string) {
    if (this.editable) {
      this.pageNumber = value
      this.newPageNumber.emit(this.pageNumber)
    }
  }
}
