import { ComponentFixture, TestBed } from "@angular/core/testing"
import { TestUtil } from "src/tests/testUtil"

import { RequiredTimeDisplayComponent } from "./required-time-display.component"

describe("RequiredTimeDisplayComponent", () => {
  let component: RequiredTimeDisplayComponent
  let fixture: ComponentFixture<RequiredTimeDisplayComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequiredTimeDisplayComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RequiredTimeDisplayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should update requiredTime if editable", () => {
    component.editable = true
    component.requiredTime = undefined

    const newRequiredTime = 5
    TestUtil.observableShouldBeCalledAndIncludeValue(
      component.newRequiredTime,
      newRequiredTime,
      // @ts-ignore
      component.updateRequiredTime.bind(component),
      newRequiredTime.toString()
    )

    // @ts-ignore
    expect(component.requiredTime).toBe(newRequiredTime)
  })

  it("should not update requiredTime if not editable", () => {
    component.editable = false
    component.requiredTime = undefined

    component.requiredTimeFormControl.setValue(5)

    expect(component.requiredTime).toBeUndefined()
  })

  it("should update requiredTime to undefined if new value is empty", () => {
    component.editable = true
    component.requiredTime = 5

    TestUtil.observableShouldBeCalledAndIncludeValue(
      component.newRequiredTime,
      undefined,
      // @ts-ignore
      component.updateRequiredTime.bind(component),
      ""
    )

    expect(component.requiredTime).toBeUndefined()
  })

  it("should update requiredTime to undefined if new value is not a number", () => {
    component.editable = true
    component.requiredTime = 5

    TestUtil.observableShouldBeCalledAndIncludeValue(
      component.newRequiredTime,
      undefined,
      // @ts-ignore
      component.updateRequiredTime.bind(component),
      "notANumber"
    )

    expect(component.requiredTime).toBeUndefined()
  })
})
