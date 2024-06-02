import { TestBed } from "@angular/core/testing"

import { SnackbarService } from "./snackbar.service"
import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar"
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
    snackBarReferenceIsNull()
    service.recipeAddedFeedback()
    snackBarContentShouldBe("Recipe added")
  })

  it("should open snackbar when recipeEditedFeedback", () => {
    snackBarReferenceIsNull()
    service.recipeEditedFeedback()
    snackBarContentShouldBe("Recipe changed")
  })

  it("should open snackbar when recipeRemovedFeedback", () => {
    snackBarReferenceIsNull()
    service.recipeRemovedFeedback()
    snackBarContentShouldBe("Recipe removed")
  })

  it("should open snackbar when libraryImportedFeedback", () => {
    snackBarReferenceIsNull()
    service.libraryImportedFeedback()
    snackBarContentShouldBe("Library imported")
  })

  const snackBarReferenceIsNull = () => {
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    expect(service.snackBar._openedSnackBarRef).toBeNull()
  }

  const snackBarReferenceIsNotNull = () => {
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    expect(service.snackBar._openedSnackBarRef).not.toBeNull()
  }

  const snackBarContentShouldBe = (expectedContent: string) => {
    snackBarReferenceIsNotNull()
    expect(
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      service.snackBar._openedSnackBarRef?.containerInstance.snackBarConfig.data.content
    ).toBe(expectedContent)
  }
})
