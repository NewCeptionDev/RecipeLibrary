import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RatingDisplayComponent } from "./rating-display.component"
import * as trace_events from "trace_events"

describe("RatingDisplayComponent", () => {
  let component: RatingDisplayComponent
  let fixture: ComponentFixture<RatingDisplayComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingDisplayComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RatingDisplayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should update rating if editable", () => {
    component.editable = true
    component.rating = -2

    let newRating = 5
    component.updateRating(newRating)

    expect(component.rating).toBe(newRating)
  })

  it("should not update rating if not editable", () => {
    component.editable = false
    component.rating = -2

    component.updateRating(2)

    expect(component.rating).toBe(-2)
  })
})
