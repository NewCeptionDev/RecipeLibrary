import { TestBed } from "@angular/core/testing"

import { ElectronService } from "./electron.service"
import { MatSnackBarModule } from "@angular/material/snack-bar"

describe("ElectronService", () => {
  let service: ElectronService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    })
    service = TestBed.inject(ElectronService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })
})
