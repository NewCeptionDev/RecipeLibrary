import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SettingsComponent } from "./settings.component"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { FileService } from "../../../services/file.service";
import { ElectronService } from "../../../services/electron.service";
import { FileServiceMock } from "../../../../tests/mocks/FileServiceMock";
import { ElectronServiceMock } from "../../../../tests/mocks/ElectronServiceMock";

describe("SettingsComponent", () => {
  let component: SettingsComponent
  let electronService: ElectronService
  let fixture: ComponentFixture<SettingsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [MatSnackBarModule],
      providers: [{provide: FileService, useClass: FileServiceMock}, {provide: ElectronService, useClass: ElectronServiceMock}]
    }).compileComponents()

    fixture = TestBed.createComponent(SettingsComponent)
    electronService = TestBed.inject(ElectronService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should return correct filePath when getCurrentSavePath", () => {
     expect(component.getCurrentSavePath()).toBe("MockSavePath")
  });

  it("should call electron service requestImportLibrary when importLibrary", () => {
     const importLibrarySpy = spyOn(electronService, "requestImportLibrary")
    component.importLibrary()
    expect(importLibrarySpy).toHaveBeenCalled()
  });

  it("should call electron service requestNewFileSavePath when changeFilePath", () => {
    const requestPathSpy = spyOn(electronService, "requestNewFileSavePath")
    component.changeSavePath()
    expect(requestPathSpy).toHaveBeenCalled()
  });
})
