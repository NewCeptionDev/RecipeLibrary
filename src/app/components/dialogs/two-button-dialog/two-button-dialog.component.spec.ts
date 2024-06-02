import { ComponentFixture, TestBed } from "@angular/core/testing"

import { TwoButtonDialogComponent } from "./two-button-dialog.component"
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog"

describe("TwoButtonDialogComponent", () => {
  let component: TwoButtonDialogComponent
  let fixture: ComponentFixture<TwoButtonDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoButtonDialogComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useFactory: () => ({ title: "Test Dialog", content: "No content" }),
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(TwoButtonDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
