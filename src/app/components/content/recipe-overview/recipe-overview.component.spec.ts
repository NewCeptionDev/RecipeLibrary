import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RecipeOverviewComponent } from "./recipe-overview.component"
import { MatIconModule } from "@angular/material/icon"

describe("RecipeOverviewComponent", () => {
  let component: RecipeOverviewComponent
  let fixture: ComponentFixture<RecipeOverviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeOverviewComponent],
      imports: [MatIconModule],
    }).compileComponents()

    fixture = TestBed.createComponent(RecipeOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
