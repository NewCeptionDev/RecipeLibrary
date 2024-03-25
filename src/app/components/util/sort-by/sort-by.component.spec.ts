import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SortByComponent } from "./sort-by.component";
import { SortDirection } from "../../../models/sortDirection";
import { SortOptions } from "../../../models/sortOptions";

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

  it("should select abc icon when ngOnInit given selected SortOption is ALPHABET", () => {
    component.selectedSortOption = SortOptions.ALPHABET
    component.ngOnInit()
    expect(component.sortOptionIcon).toBe("abc")
  });

  it("should select star icon when ngOnInit given selected SortOption is RATING", () => {
    component.selectedSortOption = SortOptions.RATING
    component.ngOnInit()
    expect(component.sortOptionIcon).toBe("star")
  });

  it("should enable sorting and sort ascending when adjustSortDirection given disabled", () => {
    component.disabled = true
    let triggered = false
    component.sortDirectionChanged.subscribe((val) => {
      triggered = true
      expect(val).toBe(SortDirection.ASC)
    })

    component.adjustSortDirection()
    expect(component.disabled).toBeFalse()
    expect(component.sortDirection).toBe(SortDirection.ASC)
    expect(triggered).toBeTrue()
  });

  it("should switch to desc sorting when adjustSortDirection given asc sorting", () => {
    component.sortDirection = SortDirection.ASC
    component.disabled = false
    let triggered = false
    component.sortDirectionChanged.subscribe((val) => {
      triggered = true
      expect(val).toBe(SortDirection.DESC)
    })

    component.adjustSortDirection()
    // @ts-ignore
    expect(component.sortDirection).toBe(SortDirection.DESC)
    expect(triggered).toBeTrue()
  });

  it("should switch to asc sorting when adjustSortDirection given desc sorting", () => {
    component.sortDirection = SortDirection.DESC
    component.disabled = false
    let triggered = false
    component.sortDirectionChanged.subscribe((val) => {
      triggered = true
      expect(val).toBe(SortDirection.ASC)
    })

    component.adjustSortDirection()
    expect(component.disabled).toBeFalse()
    // @ts-ignore
    expect(component.sortDirection).toBe(SortDirection.ASC)
    expect(triggered).toBeTrue()
  });
})
