import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ToolbarComponent } from "./toolbar.component"
import { MatSnackBarModule } from "@angular/material/snack-bar"

describe("ToolbarComponent", () => {
  let component: ToolbarComponent
  let fixture: ComponentFixture<ToolbarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [MatSnackBarModule],
    }).compileComponents()

    fixture = TestBed.createComponent(ToolbarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
