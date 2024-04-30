import { ComponentFixture, TestBed } from "@angular/core/testing"
import { TestUtil } from "src/tests/testUtil"
import { PageNumberDisplayComponent } from "./page-number-display.component"

describe("PageNumberDisplayComponent", () => {
  let component: PageNumberDisplayComponent
  let fixture: ComponentFixture<PageNumberDisplayComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNumberDisplayComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PageNumberDisplayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should update pageNumber if editable", () => {
    component.editable = true
    component.pageNumber = ""

    const newPageNumber = "12"
    TestUtil.observableShouldBeCalledAndIncludeValue(
      component.newPageNumber,
      newPageNumber,
      // @ts-ignore
      component.updatePageNumber.bind(component),
      newPageNumber
    )

    expect(component.pageNumber).toBe(newPageNumber)
  })

  it("should not update pageNumber if not editable", () => {
    component.editable = false
    component.pageNumber = "12"

    component.pageNumberFormControl.setValue("55")

    expect(component.pageNumber).toBe("12")
  })
})
