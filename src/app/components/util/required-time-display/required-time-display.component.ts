import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormControl } from "@angular/forms"

@Component({
  selector: "app-required-time-display",
  templateUrl: "./required-time-display.component.html",
  styleUrls: ["./required-time-display.component.scss"],
})
export class RequiredTimeDisplayComponent implements OnInit {
  @Input()
  public editable: boolean = false

  @Output()
  public newRequiredTime: EventEmitter<number> = new EventEmitter()

  @Input()
  public requiredTime: number | undefined = undefined

  @Input()
  public labelAddition: string = ""

  @Input()
  public singleRow: boolean = false

  requiredTimeFormControl: FormControl = new FormControl(this.requiredTime)

  ngOnInit(): void {
    this.requiredTimeFormControl.setValue(this.requiredTime)

    this.requiredTimeFormControl.valueChanges.subscribe((value) => {
      this.updateRequiredTime(value)
    })
  }

  private updateRequiredTime(value: string) {
    if (this.editable) {
      if (value.length > 0) {
        this.requiredTime = parseInt(value, 10)
        if (Number.isNaN(this.requiredTime)) {
          this.requiredTime = undefined
        }
      } else {
        this.requiredTime = undefined
      }
      this.newRequiredTime.emit(this.requiredTime)
    }
  }
}
