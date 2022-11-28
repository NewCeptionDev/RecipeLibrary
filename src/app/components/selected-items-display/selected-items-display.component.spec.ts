import {ComponentFixture, TestBed} from "@angular/core/testing"

import {SelectedItemsDisplayComponent} from "./selected-items-display.component"

describe("SelectedItemsDisplayComponent", () => {
  let component: SelectedItemsDisplayComponent
  let fixture: ComponentFixture<SelectedItemsDisplayComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedItemsDisplayComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SelectedItemsDisplayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
