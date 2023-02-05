import {
  Component, EventEmitter, Input, OnInit, Output,
} from "@angular/core";

@Component({
  selector: "app-rating-display",
  templateUrl: "./rating-display.component.html",
  styleUrls: ["./rating-display.component.scss"],
})
export class RatingDisplayComponent implements OnInit {
  @Input()
  public editable: boolean = false;

  @Output()
  public onNewRating: EventEmitter<number> = new EventEmitter();

  @Input()
  public rating: number = -1;

  @Input()
  public labelAddition: string = "";

  constructor() {}

  ngOnInit(): void {}

  public counter(count: number): number[] {
    return Array.from(Array(count).keys());
  }

  public updateRating(newRating: number) {
    if (this.editable) {
      this.rating = newRating;
      this.onNewRating.emit(this.rating);
    }
  }
}
