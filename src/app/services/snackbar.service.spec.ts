import { TestBed } from "@angular/core/testing"

import { SnackbarService } from "./snackbar.service"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

describe("SnackbarService", () => {
  let service: SnackbarService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule],
    })
    service = TestBed.inject(SnackbarService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should open snackbar when recipeAddedFeedback", () => {
    // @ts-ignore
    expect(service._snackBar._openedSnackBarRef).toBeNull()
    service.recipeAddedFeedback()
    // @ts-ignore
    expect(service._snackBar._openedSnackBarRef).not.toBeNull()
    // @ts-ignore
    expect(
      service._snackBar._openedSnackBarRef?.containerInstance.snackBarConfig.data.content
    ).toBe("Recipe added")
  })

  it("should open snackbar when recipeEditedFeedback", () => {
    // @ts-ignore
    expect(service._snackBar._openedSnackBarRef).toBeNull()
    service.recipeEditedFeedback()
    // @ts-ignore
    expect(service._snackBar._openedSnackBarRef).not.toBeNull()
    // @ts-ignore
    expect(
      service._snackBar._openedSnackBarRef?.containerInstance.snackBarConfig.data.content
    ).toBe("Recipe changed")
  })

  it("should open snackbar when recipeRemovedFeedback", () => {
    // @ts-ignore
    expect(service._snackBar._openedSnackBarRef).toBeNull()
    service.recipeRemovedFeedback()
    // @ts-ignore
    expect(service._snackBar._openedSnackBarRef).not.toBeNull()
    // @ts-ignore
    expect(
      service._snackBar._openedSnackBarRef?.containerInstance.snackBarConfig.data.content
    ).toBe("Recipe removed")
  })

  it("should open snackbar when libraryImportedFeedback", () => {
    // @ts-ignore
    expect(service._snackBar._openedSnackBarRef).toBeNull()
    service.libraryImportedFeedback()
    // @ts-ignore
    expect(service._snackBar._openedSnackBarRef).not.toBeNull()
    // @ts-ignore
    expect(
      service._snackBar._openedSnackBarRef?.containerInstance.snackBarConfig.data.content
    ).toBe("Library imported")
  })
})
