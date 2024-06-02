import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SnackbarComponent } from "./snackbar.component"
import { MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA, MatLegacySnackBarRef as MatSnackBarRef } from "@angular/material/legacy-snack-bar"

describe("SnackbarComponent", () => {
  let component: SnackbarComponent
  let fixture: ComponentFixture<SnackbarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackbarComponent],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
        { provide: MatSnackBarRef, useValue: {} },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SnackbarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
