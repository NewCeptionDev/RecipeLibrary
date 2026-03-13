import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SidebarComponent } from "./sidebar.component"
import { ExtendedOption } from "../../models/extendedOption"

describe("SidebarComponent", () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
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
    component.addRecipeEmitter.subscribe(() => {
      triggered = true
    })
    component.addRecipeTrigger()
    expect(triggered).toBe(true)
  })

  it("should trigger editRecipes when editRecipesTrigger", () => {
    let triggered = false
    component.editRecipesEmitter.subscribe(() => {
      triggered = true
    })
    component.editRecipesTrigger()
    expect(triggered).toBe(true)
  })

  it("should trigger settings when settingsTrigger", () => {
    let triggered = false
    component.settingsEmitter.subscribe(() => {
      triggered = true
    })
    component.settingsTrigger()
    expect(triggered).toBe(true)
  })

  it("should trigger search when searchTrigger", () => {
    let triggered = false
    component.searchEmitter.subscribe(() => {
      triggered = true
    })
    component.searchTrigger()
    expect(triggered).toBe(true)
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
