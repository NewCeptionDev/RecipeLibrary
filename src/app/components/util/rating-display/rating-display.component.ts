import { Component, EventEmitter, Input, Output } from "@angular/core"

@Component({
  selector: "app-rating-display",
  templateUrl: "./rating-display.component.html",
  styleUrls: ["./rating-display.component.scss"],
})
export class RatingDisplayComponent {
  @Input()
  public editable: boolean = false

  @Output()
  public newRating: EventEmitter<number> = new EventEmitter()

  @Input()
  public rating: number = -1

  @Input()
  public labelAddition: string = ""

  @Input()
  public singleRow: boolean = false

  public counter(count: number): number[] {
    return Array.from(Array(count).keys())
  }

  public updateRating(newRating: number) {
    if (this.editable) {
      this.rating = newRating
      this.newRating.emit(this.rating)
    }
  }
}
