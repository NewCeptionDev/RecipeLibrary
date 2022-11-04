import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SearchComponent} from './components/search/search.component';
import {ExtensibleContainerComponent} from './components/extensible-container/extensible-container.component';
import {RecipeFormComponent} from './components/recipe-form/recipe-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {RatingDisplayComponent} from './components/rating-display/rating-display.component';
import {SelectedItemsDisplayComponent} from './components/selected-items-display/selected-items-display.component';
import {MatTableModule} from '@angular/material/table';
import {SelectItemsDialogComponent} from './components/dialogs/select-items-dialog/select-items-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {
  AutocompleteWithAddFunctionComponent
} from './components/autocomplete-with-add-function/autocomplete-with-add-function.component';
import {EditRecipesComponent} from './components/edit-recipes/edit-recipes.component';
import {TwoButtonDialogComponent} from './components/dialogs/two-button-dialog/two-button-dialog.component';
import {SearchOptionsComponent} from './components/search/search-options/search-options.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SearchComponent,
    ExtensibleContainerComponent,
    RecipeFormComponent,
    RatingDisplayComponent,
    SelectedItemsDisplayComponent,
    SelectItemsDialogComponent,
    AutocompleteWithAddFunctionComponent,
    EditRecipesComponent,
    TwoButtonDialogComponent,
    SearchOptionsComponent,
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
