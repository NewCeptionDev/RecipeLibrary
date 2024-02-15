import { ComponentFixture, TestBed } from "@angular/core/testing"

import { AutocompleteWithAddFunctionComponent } from "./autocomplete-with-add-function.component"
import { MatAutocompleteModule } from "@angular/material/autocomplete";

describe("AutocompleteWithAddFunctionComponent", () => {
  let component: AutocompleteWithAddFunctionComponent
  let fixture: ComponentFixture<AutocompleteWithAddFunctionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteWithAddFunctionComponent],
      imports: [MatAutocompleteModule]
    }).compileComponents()

    fixture = TestBed.createComponent(AutocompleteWithAddFunctionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should show correct placeholder when disableEditFunction is true", () => {
    component.disableAddFunction = true
    fixture.detectChanges()
    const container: HTMLElement = fixture.nativeElement
    const inputElement = container.querySelector("input")!
    expect(inputElement.placeholder).not.toContain("or add a new one")
  })

  it("should show correct placeholder when disableEditFunction is false", () => {
    component.disableAddFunction = false
    fixture.detectChanges()
    const container: HTMLElement = fixture.nativeElement
    const inputElement = container.querySelector("input")!
    expect(inputElement.placeholder).toContain("or add a new one")
  })

  it("should return same filter result regardless of query casing", () => {
    component.knownItems = ["FilterTest1", "FilterTest2", "DifferentTest"]

    // @ts-expect-error
    const lowerCaseResult = component.filterItems("FILTERTEST1")
    // @ts-expect-error
    const upperCaseResult = component.filterItems("filtertest1")

    expect(lowerCaseResult).toEqual(upperCaseResult)
  })

  it("should add query to result if not included", () => {
    component.knownItems = ["FilterTest1", "FilterTest2", "DifferentTest"]

    const query = "Filter";
    // @ts-expect-error
    const result = component.filterItems(query)

    expect(result).toContain(query)
  })

  it("should show results sorted", () => {
    component.knownItems = ["CTier", "ATier5", "ATier1"]

    const expected = ["ATier1", "ATier5", "CTier", "Tier"]

    // @ts-expect-error
    const result = component.filterItems("Tier")

    expect(result).toEqual(expected)
  })

  // On Item Select
  it("should emit selectedValue on itemSelect", () => {
    const selectedValueSpy = spyOn(component.itemSelected, "emit")

    component.onItemSelect("Test")

    expect(selectedValueSpy).toHaveBeenCalled()
  })

  it("should clear input if clearOnSelect", () => {
    component.clearOnSelect = true
    component.itemSelect.setValue("Test")
    fixture.detectChanges()

    component.onItemSelect("Test")

    expect(component.itemSelect.value).toBe("")
  })

  it("should not clear input if clearOnSelect is false", () => {
    component.clearOnSelect = false
    component.itemSelect.setValue("Test")
    fixture.detectChanges()

    component.onItemSelect("Test")

    expect(component.itemSelect.value).toBe("Test")
  })

  it("should handleKeyEvent on keyboard enter", () => {
    const handleKeyEventSpy = spyOn(component, "handleKeyUpEvent")
    // @ts-expect-error
    component.autocompleteInputElement.nativeElement.value = "Test"
    fixture.detectChanges()
    const container: HTMLElement = fixture.nativeElement
    const inputElement = container.querySelector("input")!

    inputElement.dispatchEvent(new KeyboardEvent("keyup", {key: "Enter"}))

    expect(handleKeyEventSpy).toHaveBeenCalled()
  })
})
