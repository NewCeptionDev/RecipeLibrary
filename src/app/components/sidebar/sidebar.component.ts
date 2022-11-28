import { Component, EventEmitter, OnInit, Output } from "@angular/core"

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  @Output()
  public onAddRecipe: EventEmitter<void> = new EventEmitter()

  @Output()
  public onEditRecipes: EventEmitter<void> = new EventEmitter()

  @Output()
  public onSettings: EventEmitter<void> = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  addRecipe() {
    this.onAddRecipe.emit()
  }

  editRecipes() {
    this.onEditRecipes.emit()
  }

  settings() {
    this.onSettings.emit()
  }
}
