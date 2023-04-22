import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ExtensibleContainerComponent } from "./extensible-container.component"

describe("ExtensibleContainerComponent", () => {
  let component: ExtensibleContainerComponent
  let fixture: ComponentFixture<ExtensibleContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtensibleContainerComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ExtensibleContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
