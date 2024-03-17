import { TestBed } from "@angular/core/testing"

import { DialogsService } from "./dialogs.service"
import { MatDialogModule } from "@angular/material/dialog"

describe("DialogsService", () => {
  let service: DialogsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
    })
    service = TestBed.inject(DialogsService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })
})
