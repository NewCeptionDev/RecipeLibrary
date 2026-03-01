import { Component, EventEmitter, ViewChild, inject } from "@angular/core"
import { RecipeFormComponent } from "./components/sidebar/recipe-form/recipe-form.component"
import { Recipe } from "./models/recipe"
import { DialogsService } from "./services/dialogs.service"
import { ExtendedOption } from "./models/extendedOption"
import { SearchComponent } from "./components/sidebar/search/search.component"
import { ToolbarComponent } from "./components/util/toolbar/toolbar.component"
import { BackdropComponent } from "./components/content/backdrop/backdrop.component"
import { RecipeListComponent } from "./components/content/recipe-list/recipe-list.component"
import { SidebarComponent } from "./components/sidebar/sidebar.component"
import { ExtensibleContainerComponent } from "./components/util/extensible-container/extensible-container.component"
import { EditRecipesComponent } from "./components/sidebar/edit-recipes/edit-recipes.component"
import { SettingsComponent } from "./components/sidebar/settings/settings.component"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [
    ToolbarComponent,
    BackdropComponent,
    RecipeListComponent,
    SidebarComponent,
    ExtensibleContainerComponent,
    EditRecipesComponent,
    SettingsComponent,
    SearchComponent,
    RecipeFormComponent,
  ],
})
export class AppComponent {
  private dialogService = inject(DialogsService)

  title = "RecipeLibrary"

  extended: ExtendedOption = ExtendedOption.NONE

  currentlyEditedRecipe: Recipe | undefined = undefined

  recipeEdited: EventEmitter<void> = new EventEmitter()

  @ViewChild(RecipeFormComponent)
  recipeForm!: RecipeFormComponent

  @ViewChild(SearchComponent)
  searchComponent!: SearchComponent

  constructor() {
    window.addEventListener("keydown", async (event) => {
      if (event.key === "Escape" && !this.dialogService.hasOpenDialog()) {
        await this.closeExtensibleContainer()
        event.preventDefault()
      }
    })
  }

  public async closeExtensibleContainer() {
    switch (this.extended) {
      case ExtendedOption.EDITRECIPE:
        await this.toggleEditRecipes()
        break
      case ExtendedOption.ADD:
        await this.toggleAddRecipe()
        break
      default:
        this.extended = ExtendedOption.NONE
    }
  }

  public showAddRecipe() {
    return this.extended === ExtendedOption.ADD
  }

  public showEditRecipes() {
    return this.extended === ExtendedOption.EDIT
  }

  public showEditRecipe() {
    return this.extended === ExtendedOption.EDITRECIPE
  }

  public showSearch() {
    return this.extended === ExtendedOption.SEARCH
  }

  public showSettings() {
    return this.extended === ExtendedOption.SETTINGS
  }

  public toggleSearch() {
    if (this.extended === ExtendedOption.SEARCH) {
      this.extended = ExtendedOption.NONE
    } else {
      this.extended = ExtendedOption.SEARCH
    }
  }

  public async viewSelected(newView: ExtendedOption) {
    let switchView = false
    if (this.extended === ExtendedOption.ADD || this.extended === ExtendedOption.EDITRECIPE) {
      if (this.recipeForm.hasRecipeChanged()) {
        const confirmedClose = await this.dialogService.discardNewRecipe()

        if (confirmedClose) {
          switchView = true
        }
      } else {
        switchView = true
      }
    } else {
      switchView = true
    }

    if (switchView) {
      if (newView !== ExtendedOption.EDITRECIPE) {
        this.currentlyEditedRecipe = undefined
      }

      if (newView === this.extended) {
        this.extended = ExtendedOption.NONE
      } else if (newView === ExtendedOption.ADD || newView === ExtendedOption.EDITRECIPE) {
        this.extended = ExtendedOption.NONE
        // Update after one tick, so the recipeForm gets destroyed and re-initiated with the new values

        queueMicrotask(() => {
          this.extended = newView
        })
      } else {
        this.extended = newView
      }
    }
  }

  public async toggleAddRecipe() {
    if (this.extended === ExtendedOption.ADD) {
      if (this.recipeForm.hasRecipeChanged()) {
        const closed = await this.dialogService.discardNewRecipe()

        if (closed) {
          this.extended = ExtendedOption.NONE
        }
      } else {
        this.extended = ExtendedOption.NONE
      }
    } else {
      this.currentlyEditedRecipe = undefined
      this.extended = ExtendedOption.NONE
      // Update after one tick, so the recipeForm gets destroyed and re-initiated with the new values
      queueMicrotask(() => {
        this.extended = ExtendedOption.ADD
      })
    }
  }

  public recipeChange() {
    if (this.currentlyEditedRecipe) {
      this.currentlyEditedRecipe = undefined
      this.recipeEdited.emit()
      this.extended = ExtendedOption.EDIT
    } else {
      this.extended = ExtendedOption.NONE
    }
  }

  public async toggleEditRecipes() {
    if (this.extended === ExtendedOption.EDIT || this.extended === ExtendedOption.EDITRECIPE) {
      let closed: boolean
      if (this.extended === ExtendedOption.EDITRECIPE) {
        if (this.recipeForm.hasRecipeChanged()) {
          closed = await this.dialogService.discardNewRecipe()

          if (closed) {
            this.extended = ExtendedOption.EDIT
          }
        } else {
          closed = true
          this.extended = ExtendedOption.EDIT
        }
      } else {
        closed = true
        this.extended = ExtendedOption.NONE
      }

      if (closed) {
        this.currentlyEditedRecipe = undefined
      }
    } else {
      this.extended = ExtendedOption.EDIT
    }
  }

  public toggleSettings() {
    if (this.extended === ExtendedOption.SETTINGS) {
      this.extended = ExtendedOption.NONE
    } else {
      this.extended = ExtendedOption.SETTINGS
    }
  }

  public async editRecipe(recipe: Recipe) {
    this.currentlyEditedRecipe = recipe
    await this.viewSelected(ExtendedOption.EDITRECIPE)
  }

  protected readonly ExtendedOption = ExtendedOption
}
