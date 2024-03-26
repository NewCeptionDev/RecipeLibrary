import { TestBed } from "@angular/core/testing"

import { DialogsService } from "./dialogs.service"
import { MatDialogModule } from "@angular/material/dialog"
import { TwoButtonDialogComponent } from "../components/dialogs/two-button-dialog/two-button-dialog.component"
import any = jasmine.any
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { EventEmitter } from "@angular/core"
import { TestUtil } from "../../tests/testUtil"

describe("DialogsService", () => {
  const eventEmitter = new EventEmitter()
  const dialogMock = {
    afterClosed: () => eventEmitter.asObservable(),
  }
  let service: DialogsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule],
    })
    service = TestBed.inject(DialogsService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })
  ;(<boolean[]>[true, false]).forEach((value: boolean) => {
    it("should return value of dialogOpen when hasOpenDialog", () => {
      service.dialogOpen = value
      expect(service.hasOpenDialog()).toBe(value)
    })
  })

  it("should return response from discard dialog when openDiscardNewRecipe", async () => {
    // @ts-ignore
    const dialogOpenSpy = spyOn(service.dialog, "open").and.returnValue(dialogMock)
    const promise = service.discardNewRecipe()
    expect(service.dialogOpen).toBeTrue()
    expect(dialogOpenSpy).toHaveBeenCalledWith(TwoButtonDialogComponent, {
      data: {
        title: "Discard Changes",
        content: any(String),
      },
    })
    const closeResult = true
    eventEmitter.emit(closeResult)
    await TestUtil.promiseShouldBeFulfilledAndIncludeValue(promise, closeResult)
    expect(service.dialogOpen).toBeFalse()
  })

  it("should return response from delete dialog when openDeleteRecipe", async () => {
    // @ts-ignore
    const dialogOpenSpy = spyOn(service.dialog, "open").and.returnValue(dialogMock)
    const promise = service.deleteRecipe("Any")
    expect(service.dialogOpen).toBeTrue()
    expect(dialogOpenSpy).toHaveBeenCalledWith(TwoButtonDialogComponent, {
      data: {
        title: "Delete recipe",
        content: any(String),
      },
    })
    const closeResult = true
    eventEmitter.emit(closeResult)
    await TestUtil.promiseShouldBeFulfilledAndIncludeValue(promise, closeResult)
    expect(service.dialogOpen).toBeFalse()
  })
})
