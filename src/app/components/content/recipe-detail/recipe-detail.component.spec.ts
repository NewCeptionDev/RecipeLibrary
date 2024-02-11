import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RecipeDetailComponent } from "./recipe-detail.component"
import { MatIconModule } from "@angular/material/icon"

describe("RecipeDetailComponent", () => {
  let component: RecipeDetailComponent
  let fixture: ComponentFixture<RecipeDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeDetailComponent],
      imports: [MatIconModule],
    }).compileComponents()

    fixture = TestBed.createComponent(RecipeDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
