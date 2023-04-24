import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ExtendedOption } from "../../models/extendedOption";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  @Output()
  public addRecipe: EventEmitter<void> = new EventEmitter()

  @Output()
  public editRecipes: EventEmitter<void> = new EventEmitter()

  @Output()
  public settings: EventEmitter<void> = new EventEmitter()

  @Output()
  public search: EventEmitter<void> = new EventEmitter()

  @Input()
  public activeRef: ExtendedOption | undefined

  addRecipeTrigger() {
    this.addRecipe.emit()
  }

  editRecipesTrigger() {
    this.editRecipes.emit()
  }

  settingsTrigger() {
    this.settings.emit()
  }

  searchTrigger() {
    this.search.emit()
  }

  protected readonly ExtendedOption = ExtendedOption;

  public searchRefActive() {
    return this.activeRef === ExtendedOption.SEARCH
  }

  public addRefActive() {
    return this.activeRef === ExtendedOption.ADD
  }

  public editRefActive() {
    return this.activeRef === ExtendedOption.EDIT || this.activeRef === ExtendedOption.EDITRECIPE
  }

  public settingsRefActive() {
    return this.activeRef === ExtendedOption.SETTINGS
  }
}
