import { Component, EventEmitter, Output } from "@angular/core"

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
}
