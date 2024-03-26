import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SidebarComponent } from "./sidebar.component"
import { ExtendedOption } from "../../models/extendedOption"

describe("SidebarComponent", () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should trigger addRecipe when addRecipeTrigger", () => {
    let triggered = false
    component.addRecipe.subscribe(() => {
      triggered = true
    })
    component.addRecipeTrigger()
    expect(triggered).toBeTrue()
  })

  it("should trigger editRecipes when editRecipesTrigger", () => {
    let triggered = false
    component.editRecipes.subscribe(() => {
      triggered = true
    })
    component.editRecipesTrigger()
    expect(triggered).toBeTrue()
  })

  it("should trigger settings when settingsTrigger", () => {
    let triggered = false
    component.settings.subscribe(() => {
      triggered = true
    })
    component.settingsTrigger()
    expect(triggered).toBeTrue()
  })

  it("should trigger search when searchTrigger", () => {
    let triggered = false
    component.search.subscribe(() => {
      triggered = true
    })
    component.searchTrigger()
    expect(triggered).toBeTrue()
  })

  Object.values(ExtendedOption).forEach((option) => {
    it(`should return ${option === ExtendedOption.SEARCH} when searchRefActive`, () => {
      // @ts-ignore
      component.activeRef = option
      expect(component.searchRefActive()).toBe(option === ExtendedOption.SEARCH)
    })
  })

  Object.values(ExtendedOption).forEach((option) => {
    it(`should return ${option === ExtendedOption.ADD} when addRefActive`, () => {
      // @ts-ignore
      component.activeRef = option
      expect(component.addRefActive()).toBe(option === ExtendedOption.ADD)
    })
  })

  Object.values(ExtendedOption).forEach((option) => {
    it(`should return ${
      option === ExtendedOption.EDIT || option === ExtendedOption.EDITRECIPE
    } when editRefActive`, () => {
      // @ts-ignore
      component.activeRef = option
      expect(component.editRefActive()).toBe(
        option === ExtendedOption.EDIT || option === ExtendedOption.EDITRECIPE
      )
    })
  })

  Object.values(ExtendedOption).forEach((option) => {
    it(`should return ${option === ExtendedOption.SETTINGS} when settingsRefActive`, () => {
      // @ts-ignore
      component.activeRef = option
      expect(component.settingsRefActive()).toBe(option === ExtendedOption.SETTINGS)
    })
  })
})
