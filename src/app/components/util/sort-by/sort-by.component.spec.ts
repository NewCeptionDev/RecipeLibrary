import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SortByComponent } from "./sort-by.component"
import { SortDirection } from "../../../models/sortDirection"

describe("SortByComponent", () => {
  let component: SortByComponent
  let fixture: ComponentFixture<SortByComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortByComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SortByComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should show expand_less icon if sort direction is ASC", () => {
    component.sortDirection = SortDirection.ASC
    component.disabled = false
    const display = fixture.nativeElement
    component.ngOnInit()
    fixture.detectChanges()
    const expandLessIcon = display.querySelector(".sortDirection mat-icon:first-child")
    const expandMoreIcon = display.querySelector(".sortDirection mat-icon:last-child")

    expect(expandLessIcon).not.toHaveClass("disabled")
    expect(expandMoreIcon).toHaveClass("disabled")
  })

  it("should show expand_more icon if sort direction is DESC", () => {
    component.sortDirection = SortDirection.DESC
    component.disabled = false
    const display = fixture.nativeElement
    component.ngOnInit()
    fixture.detectChanges()
    const expandLessIcon = display.querySelector(".sortDirection mat-icon:first-child")
    const expandMoreIcon = display.querySelector(".sortDirection mat-icon:last-child")

    expect(expandLessIcon).toHaveClass("disabled")
    expect(expandMoreIcon).not.toHaveClass("disabled")
  })

  // TODO Add tests
})
