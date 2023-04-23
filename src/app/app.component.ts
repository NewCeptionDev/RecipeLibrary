import { Component, EventEmitter, ViewChild } from "@angular/core";
import { RecipeFormComponent } from "./components/sidebar/recipe-form/recipe-form.component";
import { Recipe } from "./models/recipe";
import { DialogsService } from "./services/dialogs.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "RecipeLibrary"

  extended: ExtendedOption = ExtendedOption.NONE

  currentlyEditedRecipe: Recipe | undefined = undefined

  recipeEdited: EventEmitter<void> = new EventEmitter()

  @ViewChild(RecipeFormComponent)
  recipeForm!: RecipeFormComponent

  constructor(private dialogService: DialogsService) {
    window.addEventListener("keyup", async (event) => {
      if(event.key === "Escape") {
        switch (this.extended) {
          case ExtendedOption.EDITRECIPE:
            await this.toggleEditRecipes()
            break;
          case ExtendedOption.ADD:
            await this.toggleAddRecipe()
            break;
          default:
            this.extended = ExtendedOption.NONE
        }
      }

      event.preventDefault()
    }, true)

  }

  public showExtensibleContainer() {
    return this.extended !== ExtendedOption.NONE
  }

  public showAddRecipe() {
    return this.extended === ExtendedOption.ADD
  }

  public showEditRecipes() {
    return this.extended === ExtendedOption.EDIT || this.extended === ExtendedOption.EDITRECIPE
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
      this.currentlyEditedRecipe = undefined
      this.extended = ExtendedOption.SEARCH
    }
  }

  public async toggleAddRecipe() {
    if (this.extended === ExtendedOption.ADD) {
      if(this.recipeForm.hasRecipeChanged()) {
        const confirmedClose = await this.dialogService.discardNewRecipe()

        if(confirmedClose) {
          this.extended = ExtendedOption.NONE
        }
      } else {
        this.extended = ExtendedOption.NONE
      }
    } else {
      this.currentlyEditedRecipe = undefined
      this.extended = ExtendedOption.NONE
      // Update after one Tick, so the recipeform gets destroyed and reinitiated with the new values
      setTimeout(() => {
        this.extended = ExtendedOption.ADD
      }, 1)
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

  public clearExtended() {
    this.extended = ExtendedOption.NONE
  }

  public async toggleEditRecipes() {
    if (this.extended === ExtendedOption.EDIT || this.extended === ExtendedOption.EDITRECIPE) {
      let closed: boolean
      if(this.extended === ExtendedOption.EDITRECIPE) {
        if(this.recipeForm.hasRecipeChanged()) {
          closed = await this.dialogService.discardNewRecipe()
        } else {
          closed = true
        }
      } else {
        closed = true
      }

      if(closed) {
        this.extended = ExtendedOption.NONE
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

  public editRecipe(recipe: Recipe) {
    this.currentlyEditedRecipe = recipe
    if (this.extended === ExtendedOption.EDITRECIPE) {
      this.extended = ExtendedOption.EDIT
      setTimeout(() => {
        this.extended = ExtendedOption.EDITRECIPE
      }, 1)
    } else {
      this.extended = ExtendedOption.EDITRECIPE
    }
  }
}

enum ExtendedOption {
  NONE,
  SEARCH,
  ADD,
  EDIT,
  EDITRECIPE,
  SETTINGS,
}
