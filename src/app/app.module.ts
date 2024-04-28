import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from "@angular/material/input"

import { SidebarComponent } from "./components/sidebar/sidebar.component"
import { SearchComponent } from "./components/sidebar/search/search.component"
import { ExtensibleContainerComponent } from "./components/util/extensible-container/extensible-container.component"
import { RecipeFormComponent } from "./components/sidebar/recipe-form/recipe-form.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { RatingDisplayComponent } from "./components/util/rating-display/rating-display.component"
import { SelectedItemsDisplayComponent } from "./components/util/selected-items-display/selected-items-display.component"
import { MatTableModule } from "@angular/material/table"
import { MatDialogModule } from "@angular/material/dialog"
import { EditRecipesComponent } from "./components/sidebar/edit-recipes/edit-recipes.component"
import { TwoButtonDialogComponent } from "./components/dialogs/two-button-dialog/two-button-dialog.component"
import { RecipeListComponent } from "./components/content/recipe-list/recipe-list.component"
import { RecipeOverviewComponent } from "./components/content/recipe-overview/recipe-overview.component"
import { RecipeDetailComponent } from "./components/content/recipe-detail/recipe-detail.component"
import { BackdropComponent } from "./components/content/backdrop/backdrop.component"
import { SettingsComponent } from "./components/sidebar/settings/settings.component"
import { AutocompleteWithAddFunctionComponent } from "./components/util/autocomplete-with-add-function/autocomplete-with-add-function.component"
import { ToolbarComponent } from "./components/util/toolbar/toolbar.component"
import { SnackbarComponent } from "./components/util/snackbar/snackbar.component"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { SortByComponent } from "./components/util/sort-by/sort-by.component"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { RequiredTimeDisplayComponent } from "./components/util/required-time-display/required-time-display.component";
import { PageNumberDisplayComponent } from './components/util/page-number-display/page-number-display.component'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SearchComponent,
    ExtensibleContainerComponent,
    RecipeFormComponent,
    RatingDisplayComponent,
    SelectedItemsDisplayComponent,
    AutocompleteWithAddFunctionComponent,
    EditRecipesComponent,
    TwoButtonDialogComponent,
    RecipeListComponent,
    RecipeOverviewComponent,
    RecipeDetailComponent,
    BackdropComponent,
    SettingsComponent,
    ToolbarComponent,
    SnackbarComponent,
    SortByComponent,
    RequiredTimeDisplayComponent,
    PageNumberDisplayComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
