import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ToolbarComponent } from "./toolbar.component"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { ElectronService } from "../../../services/electron.service"
import { ElectronServiceMock } from "../../../../tests/mocks/ElectronServiceMock"

describe("ToolbarComponent", () => {
  let component: ToolbarComponent
  let fixture: ComponentFixture<ToolbarComponent>
  let electronService: ElectronService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [MatSnackBarModule],
      providers: [{ provide: ElectronService, useClass: ElectronServiceMock }],
    }).compileComponents()

    fixture = TestBed.createComponent(ToolbarComponent)
    electronService = TestBed.inject(ElectronService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should call electronService closeApp when close", () => {
    const closeSpy = spyOn(electronService, "closeApp")
    component.close()
    expect(closeSpy).toHaveBeenCalled()
  })

  it("should call electronService minimizeApp when minimize", () => {
    const minimizeSpy = spyOn(electronService, "minimizeApp")
    component.minimize()
    expect(minimizeSpy).toHaveBeenCalled()
  })

  it("should call electronService maximizeApp when maximize", () => {
    const maximizeSpy = spyOn(electronService, "maximizeApp")
    component.maximize()
    expect(maximizeSpy).toHaveBeenCalled()
  })
})
