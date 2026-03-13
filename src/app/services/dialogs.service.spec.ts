import { TestBed } from "@angular/core/testing"

import { DialogsService } from "./dialogs.service"
import { MatDialogModule } from "@angular/material/dialog"
import { TwoButtonDialogComponent } from "../components/dialogs/two-button-dialog/two-button-dialog.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { EventEmitter } from "@angular/core"
import { TestUtil } from "../../tests/testUtil"
import { describe, beforeEach, it, expect } from "vitest"

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
    const dialogOpenSpy = vi.spyOn(service.dialog, "open").mockReturnValue(dialogMock)
    const promise = service.discardNewRecipe()
    expect(service.dialogOpen).toBe(true)
    expect(dialogOpenSpy).toHaveBeenCalledWith(TwoButtonDialogComponent, {
      data: {
        title: "Discard Changes",
        content: expect.any(String),
      },
    })
    const closeResult = true
    eventEmitter.emit(closeResult)
    await TestUtil.promiseShouldBeFulfilledAndIncludeValue(promise, closeResult)
    expect(service.dialogOpen).toBe(false)
  })

  it("should return response from delete dialog when openDeleteRecipe", async () => {
    // @ts-ignore
    const dialogOpenSpy = vi.spyOn(service.dialog, "open").mockReturnValue(dialogMock)
    const promise = service.deleteRecipe("Any")
    expect(service.dialogOpen).toBe(true)
    expect(dialogOpenSpy).toHaveBeenCalledWith(TwoButtonDialogComponent, {
      data: {
        title: "Delete recipe",
        content: expect.any(String),
      },
    })
    const closeResult = true
    eventEmitter.emit(closeResult)
    await TestUtil.promiseShouldBeFulfilledAndIncludeValue(promise, closeResult)
    expect(service.dialogOpen).toBe(false)
  })
})
