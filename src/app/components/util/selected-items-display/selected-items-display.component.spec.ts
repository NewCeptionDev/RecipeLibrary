import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SelectedItemsDisplayComponent } from "./selected-items-display.component"
import { MatTableModule } from "@angular/material/table"
import { EventEmitter } from "@angular/core";

describe("SelectedItemsDisplayComponent", () => {
  let component: SelectedItemsDisplayComponent
  let fixture: ComponentFixture<SelectedItemsDisplayComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedItemsDisplayComponent],
      imports: [MatTableModule],
    }).compileComponents()

    fixture = TestBed.createComponent(SelectedItemsDisplayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should show correct label if justKnownItemsSelectable is true", () => {
    component.justKnownItemsSelectable = true
    component.headline = "Items"
    const display = fixture.nativeElement
    const autocomplete = display.querySelector("app-autocomplete-with-add-function")!
    autocomplete.label = "Select Items"
  })

  it("should show correct label if justKnownItemsSelectable is false", () => {
    component.justKnownItemsSelectable = false
    component.headline = "Items"
    const display = fixture.nativeElement
    const autocomplete = display.querySelector("app-autocomplete-with-add-function")!
    autocomplete.label = "Add / Select Items"
  })

  it("should show no recipes note if no recipes were added", () => {
    component.ngOnInit()
    component.data = []
    component.refreshTableData()
    fixture.detectChanges()
    const display: HTMLElement = fixture.nativeElement
    const tableCell = display.querySelector(".mat-cell")!

    expect(tableCell.textContent!.trim()).toBe(component.noItemsAddedDescription)
  })

  it("should add item on itemSelect", () => {
    const addItem = "newItem"
    component.data = ["test", "entries"]

    component.onItemSelect(addItem)

    expect(component.data.length).toBe(3)
    expect(component.data).toContain(addItem)
  })

  it("should not add item on itemSelect if already present", () => {
    const existingItem = "newItem"
    component.data = ["test", "entries", existingItem]

    component.onItemSelect(existingItem)

    expect(component.data.length).toBe(3)
  })

  it("should remove element on removeElement", () => {
    const removalItem = "items"
    component.data = ["test", removalItem, "entries"]

    component.removeElement(removalItem)

    expect(component.data.length).toBe(2)
    expect(component.data).not.toContain(removalItem)
  })

  it("should correctly initialize component given data length larger 0", () => {
    component.data = ["Data"]
    const setDataSpy = spyOn(component.tableDataSource, "setData")

    component.ngOnInit()

    expect(setDataSpy).toHaveBeenCalled()
  });

  it("should correctly initialize component given editable is false", () => {
    component.editable = false

    component.ngOnInit()

    expect(component.columns).toHaveSize(1)
    expect(component.columns[0]).toBe("name")
  });

  it("should correctly initialize component given triggerRefresh is set", () => {
    const eventEmitter = new EventEmitter<void>()
    component.triggerRefresh = eventEmitter
    const refreshTableSpy = spyOn(component, "refreshTableData")

    component.ngOnInit()

    // Should cause refreshTableData to be called
    eventEmitter.emit()

    expect(refreshTableSpy).toHaveBeenCalled()
  });
})
