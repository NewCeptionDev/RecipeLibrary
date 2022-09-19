import { Component, EventEmitter } from '@angular/core';
import { Recipe } from './models/recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RecipeLibrary';

  extended: ExtendedOption = ExtendedOption.NONE;

  currentlyEditedRecipe: Recipe | undefined = undefined;

  recipeEdited: EventEmitter<void> = new EventEmitter();

  public showExtensibleContainer() {
    return this.extended !== ExtendedOption.NONE;
  }

  public showAddRecipe() {
    return this.extended === ExtendedOption.ADD;
  }

  public showEditRecipes() {
    return this.extended === ExtendedOption.EDIT || this.extended === ExtendedOption.EDITRECIPE;
  }

  public showEditRecipe() {
    return this.extended === ExtendedOption.EDITRECIPE;
  }

  public toggleAddRecipe() {
    if(this.extended === ExtendedOption.ADD) {
      this.extended = ExtendedOption.NONE;
    } else {
      this.currentlyEditedRecipe = undefined;
      this.extended = ExtendedOption.ADD;
    }
  }

  public recipeChange() {
    if(this.currentlyEditedRecipe) {
      this.currentlyEditedRecipe = undefined;
      this.recipeEdited.emit();
      this.extended = ExtendedOption.EDIT;
    } else {
      this.extended = ExtendedOption.NONE;
    }
  }

  public clearExtended() {
    this.extended = ExtendedOption.NONE;
  }

  public toggleEditRecipes() {
    if(this.extended === ExtendedOption.EDIT || this.extended === ExtendedOption.EDITRECIPE) {
      this.extended = ExtendedOption.NONE;
      this.currentlyEditedRecipe = undefined;
    } else {
      this.extended = ExtendedOption.EDIT;
    }
  }

  public toggleSettings() {
    if(this.extended === ExtendedOption.SETTINGS) {
      this.extended = ExtendedOption.NONE;
    } else {
      this.extended = ExtendedOption.SETTINGS;
    }
  }

  public editRecipe(recipe: Recipe) {
    this.currentlyEditedRecipe = recipe;
    this.extended = ExtendedOption.EDITRECIPE;
  }
}

enum ExtendedOption {
  NONE,
  ADD,
  EDIT,
  EDITRECIPE,
  SETTINGS
}
