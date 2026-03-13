import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ToolbarComponent } from "./toolbar.component"
import { ElectronService } from "../../../services/electron.service"
import { ElectronServiceMock } from "../../../../tests/mocks/ElectronServiceMock"
import { vi } from "vitest"
import { MatIconModule } from "@angular/material/icon"

describe("ToolbarComponent", () => {
  let component: ToolbarComponent
  let fixture: ComponentFixture<ToolbarComponent>
  let electronService: ElectronService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, ToolbarComponent],
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
    const closeSpy = vi.spyOn(electronService, "closeApp")
    component.close()
    expect(closeSpy).toHaveBeenCalled()
  })

  it("should call electronService minimizeApp when minimize", () => {
    const minimizeSpy = vi.spyOn(electronService, "minimizeApp")
    component.minimize()
    expect(minimizeSpy).toHaveBeenCalled()
  })

  it("should call electronService maximizeApp when maximize", () => {
    const maximizeSpy = vi.spyOn(electronService, "maximizeApp")
    component.maximize()
    expect(maximizeSpy).toHaveBeenCalled()
  })
})
