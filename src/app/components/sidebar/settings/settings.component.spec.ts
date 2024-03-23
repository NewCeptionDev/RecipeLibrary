import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SettingsComponent } from "./settings.component"
import { MatSnackBarModule } from "@angular/material/snack-bar"

describe("SettingsComponent", () => {
  let component: SettingsComponent
  let fixture: ComponentFixture<SettingsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [MatSnackBarModule],
    }).compileComponents()

    fixture = TestBed.createComponent(SettingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  // TODO add tests
})
