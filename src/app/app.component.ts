import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RecipeLibrary';

  extended: ExtendedOption = ExtendedOption.NONE;

  public showExtensibleContainer() {
    return this.extended !== ExtendedOption.NONE;
  }

  public showAddRecipe() {
    return this.extended === ExtendedOption.ADD;
  }

  public showEditRecipes() {
    return this.extended === ExtendedOption.EDIT;
  }

  public toggleAddRecipe() {
    if(this.extended === ExtendedOption.ADD) {
      this.extended = ExtendedOption.NONE;
    } else {
      this.extended = ExtendedOption.ADD;
    }
  }

  public toggleEditRecipes() {
    if(this.extended === ExtendedOption.EDIT) {
      this.extended = ExtendedOption.NONE;
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
}

enum ExtendedOption {
  NONE,
  ADD,
  EDIT,
  SETTINGS
}
