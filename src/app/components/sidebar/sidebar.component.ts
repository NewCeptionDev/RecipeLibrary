import { Component, EventEmitter, Input, Output } from "@angular/core"
import { ExtendedOption } from "../../models/extendedOption"
import { MatIconButton } from "@angular/material/button"
import { NgClass } from "@angular/common"
import { MatIcon } from "@angular/material/icon"

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  imports: [MatIconButton, NgClass, MatIcon],
})
export class SidebarComponent {
  @Output()
  public addRecipeEmitter: EventEmitter<void> = new EventEmitter()

  @Output()
  public editRecipesEmitter: EventEmitter<void> = new EventEmitter()

  @Output()
  public settingsEmitter: EventEmitter<void> = new EventEmitter()

  @Output()
  public searchEmitter: EventEmitter<void> = new EventEmitter()

  @Input()
  public activeRef: ExtendedOption | undefined

  addRecipeTrigger() {
    this.addRecipeEmitter.emit()
  }

  editRecipesTrigger() {
    this.editRecipesEmitter.emit()
  }

  settingsTrigger() {
    this.settingsEmitter.emit()
  }

  searchTrigger() {
    this.searchEmitter.emit()
  }

  protected readonly ExtendedOption = ExtendedOption

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
